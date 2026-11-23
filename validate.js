/*
 * Undertow answer validation.
 *
 * check(prompt, input) returns one of:
 *   { status: 'accepted', answer, fuzzy }      answer = the matched answer object
 *   { status: 'rejected', message }            message may be '' (use the default)
 *   { status: 'empty' }
 */
(function (UT) {
  'use strict';

  var NUMBER_WORDS = {
    zero: '0', one: '1', two: '2', three: '3', four: '4', five: '5', six: '6',
    seven: '7', eight: '8', nine: '9', ten: '10', eleven: '11', twelve: '12'
  };

  // Lowercase, strip accents and punctuation, collapse spaces, drop a leading article,
  // turn "&" into "and" and small number words into digits.
  function normalize(s) {
    s = String(s == null ? '' : s);
    s = s.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    s = s.toLowerCase();
    s = s.replace(/&/g, ' and ');
    s = s.replace(/\+\+/g, ' plus plus ').replace(/#/g, ' sharp ');   // C++ and C# keep their meaning
    s = s.replace(/['’‘`´]/g, '');      // apostrophes vanish: "night's" -> "nights"
    s = s.replace(/[^a-z0-9]+/g, ' ').trim();           // everything else becomes a space
    s = s.replace(/^(the|a|an) (?=\S)/, '');
    s = s.split(' ').map(function (w) { return NUMBER_WORDS[w] || w; }).join(' ');
    return s;
  }

  // Remove a prompt's trailing filler words ("cheese", "national park") if something is left.
  function stripWords(s, strip) {
    if (!strip || !strip.length) return s;
    var changed = true;
    while (changed) {
      changed = false;
      for (var i = 0; i < strip.length; i++) {
        var w = ' ' + normalize(strip[i]);
        if (s.length > w.length && s.slice(-w.length) === w) {
          s = s.slice(0, -w.length);
          changed = true;
        }
      }
    }
    return s;
  }

  function key(s, prompt) {
    return stripWords(normalize(s), prompt && prompt.strip);
  }

  // Forms the player's input could stand for: itself, and a singular if it looks plural.
  function inputForms(n) {
    var out = [n];
    if (n.length >= 4 && /s$/.test(n)) out.push(n.slice(0, -1));
    if (n.length >= 5 && /es$/.test(n)) out.push(n.slice(0, -2));
    if (n.length >= 5 && /ies$/.test(n)) out.push(n.slice(0, -3) + 'y');
    return out;
  }

  // Forms an answer accepts beyond its exact spelling: a plural typed as singular.
  function answerForms(n) {
    var out = [n];
    if (n.length >= 5 && /s$/.test(n)) out.push(n.slice(0, -1));
    return out;
  }

  // Optimal string alignment distance (Damerau-Levenshtein with adjacent transpositions).
  function distance(a, b) {
    if (a === b) return 0;
    var al = a.length, bl = b.length;
    if (!al) return bl;
    if (!bl) return al;
    if (Math.abs(al - bl) > 2) return 3;
    var d = [];
    for (var i = 0; i <= al; i++) { d[i] = [i]; }
    for (var j = 0; j <= bl; j++) { d[0][j] = j; }
    for (i = 1; i <= al; i++) {
      for (j = 1; j <= bl; j++) {
        var cost = a[i - 1] === b[j - 1] ? 0 : 1;
        var v = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + cost);
        if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) {
          v = Math.min(v, d[i - 2][j - 2] + 1);
        }
        d[i][j] = v;
      }
    }
    return d[al][bl];
  }

  function allowedTypos(form) {
    var len = form.replace(/ /g, '').length;
    if (len <= 3) return 0;
    if (len <= 7) return 1;
    return 2;
  }

  // Cache normalized forms on each prompt the first time it is checked.
  function prepare(prompt) {
    if (prompt._prepared) return prompt._prepared;
    var answers = prompt.answers.map(function (a, idx) {
      var forms = [a.text].concat(a.aliases || []).map(function (f) { return key(f, prompt); });
      var expanded = [];
      forms.forEach(function (f) {
        answerForms(f).forEach(function (x) { if (x && expanded.indexOf(x) < 0) expanded.push(x); });
      });
      return { idx: idx, forms: expanded, primary: forms };
    });
    var rejects = (prompt.reject || []).map(function (r) {
      return { forms: r.words.map(function (w) { return key(w, prompt); }), message: r.message };
    });
    var promptWords = normalize(prompt.prompt).split(' ').filter(function (w) { return w.length > 2; });
    prompt._prepared = { answers: answers, rejects: rejects, promptWords: promptWords };
    return prompt._prepared;
  }

  function check(prompt, rawInput) {
    var n = key(rawInput, prompt);
    if (!n) return { status: 'empty' };
    var prep = prepare(prompt);
    var forms = inputForms(n);

    if (prompt.lengthRule) {
      var letters = normalize(rawInput).replace(/ /g, '');
      if (letters.length !== prompt.lengthRule) {
        return { status: 'rejected', message: 'It needs exactly ' + prompt.lengthRule + ' letters.' };
      }
    }

    // 1. Exact match (including aliases and simple plurals).
    for (var i = 0; i < prep.answers.length; i++) {
      var a = prep.answers[i];
      for (var f = 0; f < forms.length; f++) {
        if (a.forms.indexOf(forms[f]) >= 0) {
          return { status: 'accepted', answer: prompt.answers[a.idx], fuzzy: false };
        }
      }
    }

    // 2. Deliberate near-misses with a friendly explanation.
    for (i = 0; i < prep.rejects.length; i++) {
      for (f = 0; f < forms.length; f++) {
        if (prep.rejects[i].forms.indexOf(forms[f]) >= 0) {
          return { status: 'rejected', message: prep.rejects[i].message };
        }
      }
    }

    // 3. Typo tolerance. Only accept if exactly one answer is close enough.
    var hits = [];
    for (i = 0; i < prep.answers.length; i++) {
      a = prep.answers[i];
      var matched = false;
      for (var p = 0; p < a.primary.length && !matched; p++) {
        var target = a.primary[p];
        var allowed = allowedTypos(target);
        if (!allowed) continue;
        for (f = 0; f < forms.length; f++) {
          if (Math.abs(forms[f].length - target.length) > allowed) continue;
          if (distance(forms[f], target) <= allowed) { matched = true; break; }
        }
      }
      if (matched) hits.push(a.idx);
    }
    if (hits.length === 1) {
      return { status: 'accepted', answer: prompt.answers[hits[0]], fuzzy: true };
    }
    if (hits.length > 1) {
      return { status: 'rejected', message: 'That is close to more than one answer. Check the spelling.' };
    }

    // 3b. Misspelled near-misses still get their explanation ("octapus").
    for (i = 0; i < prep.rejects.length; i++) {
      var rf = prep.rejects[i].forms;
      for (p = 0; p < rf.length; p++) {
        var al = allowedTypos(rf[p]);
        if (al && distance(n, rf[p]) <= al) return { status: 'rejected', message: prep.rejects[i].message };
      }
    }

    // 4. Echoing the question back.
    if (prep.promptWords.indexOf(n) >= 0) {
      return { status: 'rejected', message: 'That word is part of the question. Try an answer!' };
    }

    return { status: 'rejected', message: '' };
  }

  var TIER_RANK = { common: 0, uncommon: 1, rare: 2, deep: 3, legendary: 4 };

  // The rarest answers for a prompt (all answers in its top tier).
  function rarest(prompt) {
    var best = -1;
    prompt.answers.forEach(function (a) { best = Math.max(best, TIER_RANK[a.tier]); });
    return prompt.answers.filter(function (a) { return TIER_RANK[a.tier] === best; });
  }

  // Three teaching examples: one easy, one in the middle, one rarest.
  function examples(prompt, rand) {
    rand = rand || Math.random;
    function pick(tiers) {
      var pool = prompt.answers.filter(function (a) { return tiers.indexOf(a.tier) >= 0; });
      return pool.length ? pool[Math.floor(rand() * pool.length)] : null;
    }
    var out = [pick(['common']), pick(['rare', 'uncommon']), pick(['legendary', 'deep'])];
    return out.filter(Boolean);
  }

  UT.validate = {
    normalize: normalize,
    key: key,
    distance: distance,
    check: check,
    rarest: rarest,
    examples: examples,
    TIER_RANK: TIER_RANK
  };
})(window.UT = window.UT || {});
