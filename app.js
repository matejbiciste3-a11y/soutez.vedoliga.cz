(function () {
  "use strict";
  const rounds = {
    cz: {
      name: "Český film",
      questions: [
        {
          q: "Jak se jmenuje hlavní hrdina filmu Ať žijí duchové!, kterému kamarádi říkají Dlouhý?",
          a: ["Jenda", "Petr", "Honza", "Mirek"],
          c: 0,
          e: "Jenda Dlouhý patří k dětským hrdinům filmu Ať žijí duchové!.",
        },
        {
          q: "Kolik oříšků dostane Popelka ve známé filmové pohádce?",
          a: ["Jeden", "Dva", "Tři", "Čtyři"],
          c: 2,
          e: "Název pohádky zní Tři oříšky pro Popelku.",
        },
        {
          q: "Který herec ztvárnil krále v pohádce Byl jednou jeden král…?",
          a: [
            "Jan Werich",
            "Vlastimil Brodský",
            "Vladimír Menšík",
            "Jiří Sovák",
          ],
          c: 0,
          e: "Krále Já I. ztvárnil Jan Werich. Jeho rádce Atakdále hrál Vlasta Burian.",
        },
        {
          q: "Jak se jmenuje anděl, kterého hraje Ivan Trojan ve filmu Anděl Páně?",
          a: ["Uriáš", "Petronel", "Gabriel", "Michael"],
          c: 1,
          e: "Ivan Trojan hraje anděla Petronela. Čerta Uriáše ztvárnil Jiří Dvořák.",
        },
        {
          q: "Kdo natočil film Cesta do pravěku?",
          a: ["Jan Svěrák", "Karel Zeman", "Jiří Menzel", "Václav Vorlíček"],
          c: 1,
          e: "Cestu do pravěku natočil Karel Zeman, známý propojením hraného filmu a trikových postupů.",
        },
        {
          q: "Ve které pohádce vystupují princezny Drahomíra a Adélka?",
          a: [
            "S čerty nejsou žerty",
            "Tři veteráni",
            "Princ a Večernice",
            "Šíleně smutná princezna",
          ],
          c: 0,
          e: "Drahomíra a Adélka jsou princezny z pohádky S čerty nejsou žerty.",
        },
        {
          q: "Jak se jmenuje film Jana Svěráka o muzikantovi a malém ruském chlapci?",
          a: ["Obecná škola", "Kolja", "Vratné lahve", "Akumulátor 1"],
          c: 1,
          e: "Film Kolja vypráví o Františku Loukovi a chlapci Koljovi.",
        },
        {
          q: "Která dvojice stojí za scénářem pohádky Tři veteráni?",
          a: [
            "Zdeněk Svěrák a Oldřich Lipský",
            "Jan Svěrák a Jiří Menzel",
            "Karel Zeman a Jan Werich",
            "Václav Vorlíček a Miloš Macourek",
          ],
          c: 0,
          e: "Scénář podle pohádky Jana Wericha napsali Zdeněk Svěrák a Oldřich Lipský.",
        },
        {
          q: "Která postava z filmu Šíleně smutná princezna je ztvárněna Helenou Vondráčkovou?",
          a: [
            "Princezna Helena",
            "Princezna Krasomila",
            "Princezna Lada",
            "Princezna Adélka",
          ],
          c: 0,
          e: "Helena Vondráčková hraje princeznu Helenu, Václav Neckář prince Václava.",
        },
        {
          q: "Kdo je autorem literární předlohy filmu Kytice?",
          a: [
            "Karel Hynek Mácha",
            "Božena Němcová",
            "Karel Jaromír Erben",
            "Alois Jirásek",
          ],
          c: 2,
          e: "Film Kytice vychází z baladické sbírky Karla Jaromíra Erbena.",
        },
      ],
    },
    world: {
      name: "Světový film",
      questions: [
        {
          q: "Jak se jmenuje škola čar a kouzel, do které chodí Harry Potter?",
          a: ["Narnie", "Bradavice", "Středozem", "Asgard"],
          c: 1,
          e: "Harry Potter studuje v Bradavicích, anglicky Hogwarts.",
        },
        {
          q: "Ve kterém filmu vystupuje kovboj Woody a kosmonaut Buzz Rakeťák?",
          a: ["Auta", "Příšerky s.r.o.", "Toy Story", "Hledá se Nemo"],
          c: 2,
          e: "Woody a Buzz Rakeťák jsou hračky z animované série Toy Story.",
        },
        {
          q: "Jak se jmenuje lví mládě, hlavní hrdina Lvího krále?",
          a: ["Simba", "Mufasa", "Scar", "Timon"],
          c: 0,
          e: "Simba je syn Mufasy. Timon je surikata a Scar je Simbův strýc.",
        },
        {
          q: "Který režisér natočil první film Jurský park z roku 1993?",
          a: [
            "James Cameron",
            "Steven Spielberg",
            "George Lucas",
            "Peter Jackson",
          ],
          c: 1,
          e: "Jurský park z roku 1993 režíroval Steven Spielberg.",
        },
        {
          q: "Jaký druh ryby je Nemo ve filmu Hledá se Nemo?",
          a: ["Žralok", "Klaun očkatý", "Mořský koník", "Rejnok"],
          c: 1,
          e: "Nemo je klaun očkatý, ryba známá soužitím s mořskými sasankami.",
        },
        {
          q: "Kdo musí v Pánovi prstenů dopravit Jeden prsten k Hoře osudu?",
          a: ["Bilbo Pytlík", "Frodo Pytlík", "Gimli", "Boromir"],
          c: 1,
          e: "Prsten nese Frodo Pytlík. Na cestě ho doprovází Sam Křepelka.",
        },
        {
          q: "Jak se jmenuje sněhulák v Ledovém království?",
          a: ["Sven", "Kristoff", "Olaf", "Hans"],
          c: 2,
          e: "Olaf je sněhulák. Sven je sob a Kristoff jeho společník.",
        },
        {
          q: "Jak se jmenuje svět, na němž se odehrává většina prvního filmu Avatar?",
          a: ["Pandora", "Tatooine", "Arrakis", "Krypton"],
          c: 0,
          e: "Děj filmu Avatar se odehrává na Pandoře, která je měsícem plynného obra.",
        },
        {
          q: "Ve kterém filmu se objevuje robot WALL-E?",
          a: ["Velká šestka", "VALL-I", "Roboti", "Železný obr"],
          c: 1,
          e: "WALL-E je hlavní hrdina filmu uváděného v češtině pod názvem VALL-I.",
        },
        {
          q: "Který film vypráví o rodině Madrigalových v kouzelném domě?",
          a: ["Coco", "Encanto", "Odvážná Vaiana", "V hlavě"],
          c: 1,
          e: "Rodina Madrigalových žije v kouzelném domě ve filmu Encanto.",
        },
      ],
    },
    craft: {
      name: "Filmová dílna",
      questions: [
        {
          q: "Co je hlavním úkolem střihače?",
          a: [
            "Spojovat a vybírat záběry",
            "Navrhovat kostýmy",
            "Prodávat vstupenky",
            "Vyrábět filmové plakáty",
          ],
          c: 0,
          e: "Střihač skládá vybrané záběry do výsledné podoby a spoluvytváří rytmus vyprávění.",
        },
        {
          q: "Co označuje výraz storyboard?",
          a: [
            "Seznam filmových cen",
            "Obrazový plán záběrů",
            "Zvukovou stopu",
            "Smlouvu s hercem",
          ],
          c: 1,
          e: "Storyboard je posloupnost nákresů plánovaných záběrů.",
        },
        {
          q: "Jak se jmenuje krátká upoutávka na film?",
          a: ["Trailer", "Epilog", "Casting", "Dabing"],
          c: 0,
          e: "Trailer má představit film a vzbudit zájem diváků.",
        },
        {
          q: "Co znamená dabing?",
          a: [
            "Zrychlení obrazu",
            "Nahrazení původních hlasů jinými",
            "Změnu poměru stran",
            "Natáčení bez scénáře",
          ],
          c: 1,
          e: "Dabing nahrazuje původní mluvené dialogy novou hlasovou stopou, často v jiném jazyce.",
        },
        {
          q: "K čemu slouží filmová klapka při natáčení se samostatným záznamem zvuku?",
          a: [
            "K synchronizaci obrazu a zvuku",
            "K nasvícení scény",
            "K měření délky objektivu",
            "K opravě barev",
          ],
          c: 0,
          e: "Viditelný okamžik zaklapnutí a zvuk klapnutí pomáhají spojit obraz se zvukem.",
        },
        {
          q: "Co je detail ve filmovém záběru?",
          a: [
            "Záběr rozsáhlé krajiny",
            "Blízký záběr obličeje nebo předmětu",
            "Seznam všech herců",
            "Záběr natočený shora",
          ],
          c: 1,
          e: "Detail ukazuje malou část scény zblízka a zdůrazňuje výraz či důležitý předmět.",
        },
        {
          q: "Co dělá scenárista?",
          a: [
            "Píše scénář",
            "Obsluhuje projektor",
            "Vyrábí kameru",
            "Kontroluje vstupenky",
          ],
          c: 0,
          e: "Scenárista vytváří scénář, který popisuje děj, situace a dialogy.",
        },
        {
          q: "Co je stop motion animace?",
          a: [
            "Záznam výhradně zpomalenou kamerou",
            "Animace snímaná po jednotlivých obrázcích",
            "Film bez zvuku",
            "Živý přenos",
          ],
          c: 1,
          e: "Objekty se mezi jednotlivými snímky posouvají. Při přehrání snímků vzniká dojem pohybu.",
        },
        {
          q: "Jaký je hlavní účel dokumentárního filmu?",
          a: [
            "Vždy vyprávět smyšlený příběh",
            "Zachycovat a zkoumat skutečnost",
            "Promítat pouze reklamu",
            "Nahradit filmové titulky",
          ],
          c: 1,
          e: "Dokumentární film se zabývá skutečnými lidmi, událostmi a tématy. I v něm záleží na pohledu autora.",
        },
        {
          q: "Proč je užitečné při sledování filmu rozlišovat fakt a názor?",
          a: [
            "Protože každý film je pravdivý",
            "Abychom mohli kriticky posoudit sdělení",
            "Aby měl film kratší stopáž",
            "Protože názory se nesmějí objevovat ve filmu",
          ],
          c: 1,
          e: "Rozlišení faktů, interpretací a názorů pomáhá porozumět tomu, jak film vytváří své sdělení.",
        },
      ],
    },
  };
  const $ = (id) => document.getElementById(id);
  const store = {
    get(k) {
      try {
        return localStorage.getItem(k);
      } catch (e) {
        return null;
      }
    },
    set(k, v) {
      try {
        localStorage.setItem(k, v);
        return true;
      } catch (e) {
        return false;
      }
    },
    remove(k) {
      try {
        localStorage.removeItem(k);
        return true;
      } catch (e) {
        return false;
      }
    },
  };
  const key = "vedoliga.film.practice.v1";
  let selectedRound = "cz",
    session = null,
    ticker = null,
    lastResult = null,
    dialogAction = null;
  function node(tag, text, className) {
    const n = document.createElement(tag);
    if (text !== undefined) n.textContent = String(text);
    if (className) n.className = className;
    return n;
  }
  function shuffled(values) {
    const a = values.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }
  function readHistory() {
    try {
      const data = JSON.parse(store.get(key) || "[]");
      return Array.isArray(data)
        ? data
            .filter(
              (x) =>
                x &&
                typeof x.team === "string" &&
                typeof x.round === "string" &&
                Number.isInteger(x.score) &&
                x.score >= 0 &&
                x.score <= 10 &&
                typeof x.date === "string",
            )
            .slice(0, 12)
        : [];
    } catch (e) {
      return [];
    }
  }
  function showHistory() {
    const list = $("history");
    list.replaceChildren();
    const history = readHistory();
    if (!history.length)
      list.append(node("p", "Zatím žádné dokončené kolo.", "empty"));
    for (const item of history.slice(0, 5)) {
      const row = node("div", undefined, "history-item");
      row.append(node("strong", item.team + " · " + item.score + "/10"));
      row.append(
        node(
          "span",
          item.round + " · " + new Date(item.date).toLocaleDateString("cs-CZ"),
        ),
      );
      list.append(row);
    }
    $("clearHistory").disabled = !history.length;
  }
  document.querySelectorAll("[data-round]").forEach((button) =>
    button.addEventListener("click", () => {
      selectedRound = button.dataset.round;
      document
        .querySelectorAll("[data-round]")
        .forEach((b) => b.setAttribute("aria-pressed", String(b === button)));
      $("sideRound").textContent = rounds[selectedRound].name;
    }),
  );
  function stopTimer() {
    if (ticker !== null) {
      clearInterval(ticker);
      ticker = null;
    }
  }
  function announce(text) {
    $("quizAnnouncement").textContent = text;
  }
  function updateClock() {
    if (!session || !session.limit) return;
    const remaining = Math.max(
      0,
      Math.ceil((session.deadline - Date.now()) / 1000),
    );
    $("timer").textContent = remaining + " s";
    $("timer").classList.toggle("urgent", remaining <= 10);
    if (remaining === 0) {
      stopTimer();
      submitAnswer(true);
    }
  }
  function showQuestion() {
    stopTimer();
    const s = session,
      q = s.questions[s.index];
    s.selected = null;
    s.locked = false;
    $("questionCounter").textContent =
      "Otázka " + (s.index + 1) + " / " + s.questions.length;
    $("questionTopic").textContent = rounds[s.round].name;
    $("questionTitle").textContent = q.q;
    $("sideProgress").textContent = s.index + " / 10";
    $("progressFill").style.width = (s.index / s.questions.length) * 100 + "%";
    document.querySelector(".progress").setAttribute("aria-valuenow", s.index);
    $("nextQuestion").disabled = true;
    $("nextQuestion").textContent =
      s.index === s.questions.length - 1 ? "Dokončit kolo →" : "Potvrdit →";
    $("answerHint").textContent = "Vyberte jednu odpověď.";
    $("answers").replaceChildren();
    q.a.forEach((answer, index) => {
      const b = node("button", undefined, "answer");
      b.type = "button";
      b.setAttribute("aria-pressed", "false");
      b.append(node("span", "ABCD"[index], "letter"), node("span", answer));
      b.addEventListener("click", () => {
        if (s.locked) return;
        s.selected = index;
        $("answers")
          .querySelectorAll("button")
          .forEach((x) => x.setAttribute("aria-pressed", String(x === b)));
        $("nextQuestion").disabled = false;
        $("answerHint").textContent = "Odpověď je vybraná. Můžete ji změnit.";
      });
      $("answers").append(b);
    });
    if (s.limit) {
      s.deadline = Date.now() + s.limit * 1000;
      updateClock();
      ticker = setInterval(updateClock, 250);
    } else {
      $("timer").textContent = "Bez časového limitu";
      $("timer").classList.remove("urgent");
    }
    $("questionTitle").focus();
  }
  $("startForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const team = $("teamName").value.trim();
    if (!team) {
      $("teamName").setCustomValidity("Vyplňte název týmu.");
      $("teamName").reportValidity();
      return;
    }
    let questions = rounds[selectedRound].questions.map((q) => ({
      ...q,
      a: q.a.slice(),
    }));
    if ($("questionOrder").value === "random") {
      questions = shuffled(questions).map((q) => {
        const correct = q.a[q.c],
          options = shuffled(q.a);
        return { ...q, a: options, c: options.indexOf(correct) };
      });
    }
    session = {
      team,
      school: $("schoolName").value.trim(),
      round: selectedRound,
      limit: Number($("mode").value),
      questions,
      index: 0,
      answers: [],
      selected: null,
      started: Date.now(),
      locked: false,
    };
    $("sideTeam").textContent = team;
    $("sideRound").textContent = rounds[selectedRound].name;
    $("startForm").hidden = true;
    $("resultView").hidden = true;
    $("questionView").hidden = false;
    announce("Kvíz začal.");
    showQuestion();
  });
  $("teamName").addEventListener("input", () =>
    $("teamName").setCustomValidity(""),
  );
  function submitAnswer(timedOut) {
    const s = session;
    if (!s || s.locked) return;
    if (!timedOut && s.selected === null) return;
    s.locked = true;
    stopTimer();
    s.answers.push({ chosen: s.selected, timedOut: Boolean(timedOut) });
    s.index++;
    announce(
      timedOut
        ? "Čas vypršel. Odpověď byla zaznamenána."
        : "Odpověď byla zaznamenána.",
    );
    if (s.index >= s.questions.length) finish();
    else showQuestion();
  }
  $("nextQuestion").addEventListener("click", () => submitAnswer(false));
  function finish() {
    const s = session;
    stopTimer();
    const score = s.answers.reduce(
      (sum, a, i) => sum + (a.chosen === s.questions[i].c ? 1 : 0),
      0,
    );
    lastResult = {
      team: s.team,
      school: s.school,
      round: rounds[s.round].name,
      score,
      date: new Date().toISOString(),
      duration: Math.max(0, Math.round((Date.now() - s.started) / 1000)),
      limit: s.limit,
      questions: s.questions.map((q, i) => ({
        ...q,
        chosen: s.answers[i].chosen,
        timedOut: s.answers[i].timedOut,
      })),
    };
    const history = readHistory();
    history.unshift({
      team: lastResult.team,
      round: lastResult.round,
      score,
      date: lastResult.date,
    });
    if (!store.set(key, JSON.stringify(history.slice(0, 12))))
      $("storageNote").textContent =
        "Prohlížeč nepovolil uložení historie. Výsledek si stáhněte nebo vytiskněte.";
    showHistory();
    $("questionView").hidden = true;
    $("resultView").hidden = false;
    $("sideProgress").textContent = "10 / 10";
    $("resultScore").textContent = score;
    $("resultTitle").textContent =
      score >= 8
        ? "Výborné filmové oko!"
        : score >= 5
          ? "Dobrá práce, týme."
          : "První kolo je za vámi.";
    $("resultSummary").textContent =
      s.team +
      " · " +
      lastResult.round +
      " · " +
      score +
      " správných odpovědí z 10";
    $("review").replaceChildren();
    lastResult.questions.forEach((q, i) => {
      const item = node("article", undefined, "review-item");
      item.append(node("h4", i + 1 + ". " + q.q));
      item.append(
        node(
          "p",
          "Vaše odpověď: " +
            (q.chosen === null ? "Bez odpovědi" : q.a[q.chosen]) +
            (q.timedOut ? " · čas vypršel" : ""),
          q.chosen === q.c ? "correct" : "wrong",
        ),
      );
      if (q.chosen !== q.c)
        item.append(node("p", "Správně: " + q.a[q.c], "correct"));
      item.append(node("p", q.e));
      $("review").append(item);
    });
    session = null;
    $("resultTitle").focus();
    announce("Kolo dokončeno. Získali jste " + score + " bodů z 10.");
  }
  function reset() {
    stopTimer();
    session = null;
    $("startForm").hidden = false;
    $("questionView").hidden = true;
    $("resultView").hidden = true;
    $("sideProgress").textContent = "0 / 10";
    announce("Vyberte další kolo.");
    $("teamName").focus();
  }
  function confirmAction(title, text, label, callback) {
    $("dialogTitle").textContent = title;
    $("dialogText").textContent = text;
    $("dialogConfirm").textContent = label;
    $("dialogCancel").textContent = session ? "Pokračovat ve hře" : "Zrušit";
    dialogAction = callback;
    $("confirmDialog").showModal();
  }
  $("quitQuiz").addEventListener("click", () =>
    confirmAction(
      "Ukončit rozehrané kolo?",
      "Dosavadní odpovědi se neuloží. Můžete potom začít znovu.",
      "Ukončit kolo",
      reset,
    ),
  );
  $("dialogCancel").addEventListener("click", () => $("confirmDialog").close());
  $("dialogConfirm").addEventListener("click", () => {
    const action = dialogAction;
    dialogAction = null;
    $("confirmDialog").close();
    if (action) action();
  });
  $("confirmDialog").addEventListener("close", () => {
    dialogAction = null;
  });
  $("playAgain").addEventListener("click", reset);
  $("clearHistory").addEventListener("click", () =>
    confirmAction(
      "Vymazat historii tréninků?",
      "Smažou se uložené výsledky v tomto prohlížeči. Stažené soubory zůstanou zachované.",
      "Vymazat historii",
      () => {
        if (store.remove(key)) {
          showHistory();
          $("storageNote").textContent = "Historie byla vymazána.";
        } else $("storageNote").textContent = "Historii se nepodařilo vymazat.";
      },
    ),
  );
  function printBase(title) {
    const report = $("printReport");
    report.replaceChildren();
    const meta = node("div", undefined, "print-meta");
    meta.append(
      node("div", "VĚDOLIGA", "report-brand"),
      node("p", new Date().toLocaleDateString("cs-CZ")),
    );
    report.append(meta, node("h1", title));
    return report;
  }
  $("printResult").addEventListener("click", () => {
    if (!lastResult) return;
    const r = lastResult,
      report = printBase("Filmová soutěž · výsledek tréninku");
    report.append(
      node(
        "p",
        "Tým: " + r.team + (r.school ? " | Škola / třída: " + r.school : ""),
      ),
      node("p", "Kolo: " + r.round),
      node("p", r.score + " / 10 bodů", "print-total"),
      node("p", "Tréninkový výsledek. Nejde o oficiální soutěžní pořadí."),
    );
    const table = node("table"),
      head = node("tr");
    ["Otázka", "Odpověď týmu", "Správná odpověď", "Bod"].forEach((t) =>
      head.append(node("th", t)),
    );
    const thead = node("thead");
    thead.append(head);
    table.append(thead);
    const tbody = node("tbody");
    r.questions.forEach((q, i) => {
      const row = node("tr");
      [
        String(i + 1) + ". " + q.q,
        q.chosen === null ? "Bez odpovědi" : q.a[q.chosen],
        q.a[q.c],
        q.chosen === q.c ? "1" : "0",
      ].forEach((t) => row.append(node("td", t)));
      tbody.append(row);
    });
    table.append(tbody);
    report.append(
      table,
      node("p", "Učíme se. Soutěžíme. Rosteme. · vedoliga.cz", "signature"),
    );
    window.print();
  });
  $("printGuide").addEventListener("click", () => {
    const report = printBase("Filmová soutěž · pokyny pro školní trénink");
    report.append(
      node(
        "p",
        "Určeno pro druhý stupeň ZŠ a střední školy. Doporučené týmy: 2–5 žáků.",
      ),
      node("h2", "Před začátkem"),
    );
    [
      "Připravte pro každý tým zařízení s prohlížečem a otevřete stránku filmové soutěže Vědoligy.",
      "Zvolte pro všechny týmy stejné tematické kolo, stejné pořadí otázek a stejný časový limit.",
      "Domluvte jednoho hráče, který bude potvrzovat odpovědi. Internetové vyhledávání během kola nepoužívejte.",
    ].forEach((t, i) => report.append(node("p", i + 1 + ". " + t)));
    report.append(
      node("h2", "Návrh 45minutové hodiny"),
      node(
        "p",
        "5 minut: rozdělení do týmů. 10 minut: jedno tematické kolo. 15 minut: rozbor odpovědí. 15 minut: další kolo nebo společná reflexe. Tempo přizpůsobte třídě.",
      ),
      node("h2", "Otázky pro společnou reflexi"),
      node(
        "p",
        "Jak jste došli ke společné odpovědi? Kdy se hodila znalost jiného člena týmu? Co vás překvapilo o práci filmařů?",
      ),
      node("h2", "Bodování"),
      node(
        "p",
        "Kolo má 10 otázek. Správná odpověď = 1 bod, chybná nebo chybějící odpověď = 0 bodů. Při vypršení času se zaznamená právě vybraná odpověď. Při shodném skóre mají týmy remízu.",
      ),
      node("h2", "Po skončení"),
      node(
        "p",
        "Projděte odpovědi a vysvětlení. Výsledek můžete vytisknout nebo stáhnout. Historie zůstává pouze v daném prohlížeči.",
      ),
      node("h2", "Organizované školní kolo"),
      node(
        "p",
        "Trénink je zdarma a nenahrazuje oficiální registraci. Termín, pravidla, věkové kategorie a případné startovné domluvte s organizátorem.",
      ),
      node("p", "Kontakt: info@vedoliga.cz · vedoliga.cz", "signature"),
    );
    window.print();
  });
  $("downloadResult").addEventListener("click", () => {
    if (!lastResult) return;
    const r = lastResult,
      lines = [
        "VĚDOLIGA – FILMOVÁ SOUTĚŽ",
        "Výsledek tréninku",
        "Tým: " + r.team,
        "Škola / třída: " + (r.school || "neuvedeno"),
        "Kolo: " + r.round,
        "Datum: " + new Date(r.date).toLocaleString("cs-CZ"),
        "Výsledek: " + r.score + " / 10 bodů",
        "Tréninkový výsledek, nikoli oficiální soutěžní pořadí.",
        "",
      ];
    r.questions.forEach((q, i) =>
      lines.push(
        i + 1 + ". " + q.q,
        "Vaše odpověď: " + (q.chosen === null ? "Bez odpovědi" : q.a[q.chosen]),
        "Správná odpověď: " + q.a[q.c],
        q.e,
        "",
      ),
    );
    const blob = new Blob(["\ufeff" + lines.join("\n")], {
        type: "text/plain;charset=utf-8",
      }),
      url = URL.createObjectURL(blob),
      a = node("a");
    a.href = url;
    a.download = "vedoliga-filmovy-kviz-vysledek.txt";
    document.body.append(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  });
  window.addEventListener("beforeunload", (e) => {
    if (session) {
      e.preventDefault();
      e.returnValue = "";
    }
  });
  document.addEventListener("visibilitychange", () => {
    if (!document.hidden && session && session.limit) updateClock();
  });
  showHistory();
})();

(function () {
  "use strict";
  const endpoint =
    document.querySelector("meta[name=registration-endpoint]")?.content ||
    "/api/registration";
  const $ = (id) => document.getElementById(id);
  const make = (tag, text, cls) => {
    const n = document.createElement(tag);
    if (text !== undefined) n.textContent = String(text);
    if (cls) n.className = cls;
    return n;
  };
  const storage = {
    get(k) {
      try {
        return localStorage.getItem(k);
      } catch {
        return null;
      }
    },
    set(k, v) {
      try {
        localStorage.setItem(k, v);
        return true;
      } catch {
        return false;
      }
    },
    remove(k) {
      try {
        localStorage.removeItem(k);
        return true;
      } catch {
        return false;
      }
    },
  };
  function uuid() {
    if (crypto.randomUUID) return crypto.randomUUID();
    const b = crypto.getRandomValues(new Uint8Array(16));
    b[6] = (b[6] & 15) | 64;
    b[8] = (b[8] & 63) | 128;
    const h = Array.from(b, (v) => v.toString(16).padStart(2, "0")).join("");
    return (
      h.slice(0, 8) +
      "-" +
      h.slice(8, 12) +
      "-" +
      h.slice(12, 16) +
      "-" +
      h.slice(16, 20) +
      "-" +
      h.slice(20)
    );
  }
  let step = 0,
    busy = false,
    requestId = uuid(),
    lastPayload = null,
    lastResult = null,
    invalidField = null;
  const draftKey = "vedoliga.film.school-draft.v2";
  const val = (id) => $(id).value.trim();
  function theme() {
    const dark = document.documentElement.dataset.theme === "dark";
    $("theme").textContent = dark ? "☀" : "☾";
    $("theme").setAttribute(
      "aria-label",
      dark ? "Zapnout světlý režim" : "Zapnout tmavý režim",
    );
  }
  if (storage.get("theme") === "dark")
    document.documentElement.dataset.theme = "dark";
  theme();
  $("theme").addEventListener("click", () => {
    const next =
      document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    storage.set("theme", next);
    theme();
  });
  function closeMenu() {
    $("nav").classList.remove("open");
    $("menu").setAttribute("aria-expanded", "false");
    $("menu").textContent = "☰";
    $("menu").setAttribute("aria-label", "Otevřít menu");
  }
  $("menu").addEventListener("click", () => {
    const open = $("nav").classList.toggle("open");
    $("menu").setAttribute("aria-expanded", String(open));
    $("menu").textContent = open ? "×" : "☰";
    $("menu").setAttribute("aria-label", open ? "Zavřít menu" : "Otevřít menu");
  });
  $("nav")
    .querySelectorAll("a")
    .forEach((a) => a.addEventListener("click", closeMenu));
  document.addEventListener("click", (e) => {
    if (!$("nav").contains(e.target) && !$("menu").contains(e.target))
      closeMenu();
  });
  window.addEventListener("resize", () => {
    if (innerWidth > 900) closeMenu();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });
  $("year").textContent = new Date().getFullYear();
  function field(labelText, type, cls, value, options) {
    const wrap = make("div", undefined, "field");
    const id = "team-" + uuid();
    const label = make("label", labelText);
    label.htmlFor = id;
    let input;
    if (options) {
      input = make("select");
      for (const option of options) {
        const o = make("option", option.label);
        o.value = option.value;
        input.append(o);
      }
    } else {
      input = make("input");
      input.type = type;
    }
    input.id = id;
    input.className = cls;
    input.required = true;
    if (cls === "team-name") {
      input.minLength = 2;
      input.maxLength = 60;
      input.placeholder = "Např. Poslední klapka";
    }
    if (cls === "team-class") {
      input.required = false;
      input.maxLength = 40;
      input.placeholder = "Např. 8. B";
    }
    if (value !== undefined) input.value = String(value);
    wrap.append(label, input);
    return wrap;
  }
  function addTeam(
    data = { name: "", class: "", category: "2. stupeň ZŠ", players: 3 },
  ) {
    if (busy || $("teams").children.length >= 20) return;
    const row = make("div", undefined, "team-row"),
      head = make("div", undefined, "team-head");
    head.append(make("strong", "Tým"));
    const remove = make("button", "Odebrat tým");
    remove.type = "button";
    remove.addEventListener("click", () => {
      if (busy) return;
      row.remove();
      renumber();
      updateSide();
    });
    head.append(remove);
    const grid = make("div", undefined, "form-grid");
    grid.append(
      field("Název týmu", "text", "team-name", data.name),
      field("Třída / skupina (nepovinné)", "text", "team-class", data.class),
      field("Věková kategorie", "text", "team-category", data.category, [
        { label: "2. stupeň ZŠ", value: "2. stupeň ZŠ" },
        { label: "Střední škola", value: "Střední škola" },
      ]),
      field(
        "Počet hráčů",
        "text",
        "team-players",
        data.players,
        [2, 3, 4, 5].map((n) => ({
          label: n + (n < 5 ? " hráči" : " hráčů"),
          value: String(n),
        })),
      ),
    );
    row.append(head, grid);
    $("teams").append(row);
    renumber();
    updateSide();
  }
  function renumber() {
    const rows = Array.from($("teams").children);
    rows.forEach((row, i) => {
      row.querySelector("strong").textContent = "Tým " + (i + 1);
      const b = row.querySelector("button");
      b.disabled = rows.length === 1;
      b.setAttribute("aria-label", "Odebrat tým " + (i + 1));
    });
    $("teamsBadge").textContent =
      rows.length +
      " " +
      (rows.length === 1 ? "tým" : rows.length < 5 ? "týmy" : "týmů");
    $("addTeam").disabled = rows.length >= 20;
  }
  function getTeams() {
    return Array.from($("teams").children).map((row) => ({
      name: row.querySelector(".team-name").value.trim(),
      class: row.querySelector(".team-class").value.trim(),
      category: row.querySelector(".team-category").value,
      players: Number(row.querySelector(".team-players").value),
    }));
  }
  function payload() {
    return {
      school: val("school"),
      city: val("city"),
      teacher: val("teacher"),
      email: val("email").toLowerCase(),
      phone: val("phone"),
      preferred_date: val("preferredDate"),
      message: val("message"),
      teams: getTeams(),
      consent: $("consent").checked,
    };
  }
  function updateSide() {
    const p = lastResult && lastPayload ? lastPayload : payload();
    $("sideSchool").textContent = p.school || "Zatím nevyplněno";
    $("sideEmail").textContent = p.email || "Zatím nevyplněno";
    $("sideTeams").textContent = p.teams.length;
    $("sidePlayers").textContent = p.teams.reduce(
      (sum, t) => sum + t.players,
      0,
    );
    $("messageCount").textContent = $("message").value.length + " / 3000 znaků";
  }
  function validate(index) {
    invalidField = null;
    for (const f of $("step" + index).querySelectorAll(
      "input[required]:not([type=checkbox])",
    )) {
      f.setCustomValidity("");
      if (f.minLength > 0 && f.value.trim().length < f.minLength)
        f.setCustomValidity(
          "Vyplňte alespoň " + f.minLength + " znaky, samotné mezery nestačí.",
        );
    }
    if (index === 0) {
      $("emailConfirm").setCustomValidity(
        val("email").toLowerCase() !== val("emailConfirm").toLowerCase()
          ? "E-mailové adresy se neshodují."
          : "",
      );
    }
    if (index === 1) {
      const names = new Map();
      $("teams")
        .querySelectorAll(".team-name")
        .forEach((n) => {
          const key = n.value.trim().toLowerCase();
          if (names.has(key) && key)
            n.setCustomValidity(
              "Každý tým potřebuje v přihlášce vlastní název.",
            );
          names.set(key, true);
        });
    }
    for (const field of $("step" + index).querySelectorAll(
      "input,select,textarea",
    )) {
      if (!field.checkValidity()) {
        invalidField = field;
        field.setAttribute("aria-invalid", "true");
        if (!$("step" + index).hidden) {
          field.reportValidity();
          field.focus();
        }
        return false;
      }
    }
    return true;
  }
  function summary(container, p) {
    container.replaceChildren();
    const card = make("div", undefined, "summary-block");
    card.append(make("h3", "Škola a kontaktní učitel"));
    const list = make("dl", undefined, "summary-pairs");
    for (const [label, value] of [
      ["Škola", p.school],
      ["Město", p.city],
      ["Učitel", p.teacher],
      ["E-mail", p.email],
      ["Telefon", p.phone || "Neuvedeno"],
      ["Preferovaný termín", p.preferred_date || "Dle domluvy"],
    ])
      list.append(make("dt", label), make("dd", value));
    card.append(list);
    container.append(card);
    const teams = make("div", undefined, "summary-block");
    teams.append(make("h3", "Soutěžní týmy"));
    p.teams.forEach((t, i) => {
      const row = make("div", undefined, "summary-team");
      row.append(
        make("strong", i + 1 + ". " + t.name),
        make(
          "span",
          t.category +
            " · " +
            (t.class || "Třída neuvedena") +
            " · " +
            t.players +
            " hráčů",
        ),
      );
      teams.append(row);
    });
    if (p.message) {
      teams.append(make("p", "Poznámka: " + p.message));
      teams.lastChild.style.whiteSpace = "pre-wrap";
      teams.lastChild.style.fontSize = "12px";
    }
    container.append(teams);
  }
  function go(index) {
    if (busy || lastResult) return;
    if (index > step) {
      for (let i = 0; i < index; i++)
        if (!validate(i)) {
          index = i;
          break;
        }
    }
    step = index;
    for (let i = 0; i < 3; i++) $("step" + i).hidden = i !== index;
    document.querySelectorAll("[data-step]").forEach((b) => {
      if (Number(b.dataset.step) === index)
        b.setAttribute("aria-current", "step");
      else b.removeAttribute("aria-current");
      b.classList.toggle("completed", Number(b.dataset.step) < index);
    });
    if (index === 2) summary($("summary"), payload());
    $("step" + index).querySelector("h2").tabIndex = -1;
    if (invalidField && $("step" + index).contains(invalidField)) {
      invalidField.focus();
      invalidField.reportValidity();
    } else
      $("step" + index)
        .querySelector("h2")
        .focus();
    $("formError").hidden = true;
    updateSide();
  }
  document
    .querySelectorAll("[data-step]")
    .forEach((b) =>
      b.addEventListener("click", () => go(Number(b.dataset.step))),
    );
  document
    .querySelectorAll("[data-next]")
    .forEach((b) =>
      b.addEventListener("click", () => go(Number(b.dataset.next))),
    );
  document
    .querySelectorAll("[data-back]")
    .forEach((b) =>
      b.addEventListener("click", () => go(Number(b.dataset.back))),
    );
  $("addTeam").addEventListener("click", () => {
    addTeam();
    $("teams").lastElementChild?.querySelector("input")?.focus();
  });
  $("registrationForm").addEventListener("input", (e) => {
    e.target.removeAttribute("aria-invalid");
    if (e.target.setCustomValidity) e.target.setCustomValidity("");
    invalidField = null;
    $("emailConfirm").setCustomValidity("");
    $("teams")
      .querySelectorAll(".team-name")
      .forEach((n) => n.setCustomValidity(""));
    updateSide();
  });
  $("registrationForm").addEventListener("change", updateSide);
  addTeam();
  $("saveDraft").addEventListener("click", () => {
    if (busy || lastResult) return;
    const p = payload();
    p.consent = false;
    const saved = storage.set(draftKey, JSON.stringify(p));
    $("draftStatus").textContent = saved
      ? "Koncept byl uložený do tohoto prohlížeče."
      : "Prohlížeč nepovolil uložení konceptu.";
  });
  $("restoreDraft").addEventListener("click", () => {
    if (busy || lastResult) return;
    try {
      const p = JSON.parse(storage.get(draftKey) || "null");
      if (
        !p ||
        !Array.isArray(p.teams) ||
        p.teams.length < 1 ||
        p.teams.length > 20
      )
        throw new Error("Neplatný koncept");
      for (const [id, key] of [
        ["school", "school"],
        ["city", "city"],
        ["teacher", "teacher"],
        ["email", "email"],
        ["emailConfirm", "email"],
        ["phone", "phone"],
        ["preferredDate", "preferred_date"],
        ["message", "message"],
      ])
        $(id).value = typeof p[key] === "string" ? p[key] : "";
      $("teams").replaceChildren();
      for (const t of p.teams)
        addTeam({
          name: String(t.name || "").slice(0, 60),
          class: String(t.class || "").slice(0, 40),
          category:
            t.category === "Střední škola" ? "Střední škola" : "2. stupeň ZŠ",
          players: [2, 3, 4, 5].includes(t.players) ? t.players : 3,
        });
      $("consent").checked = false;
      $("emailCheck").checked = false;
      requestId = uuid();
      go(0);
      $("draftStatus").textContent =
        "Koncept byl načtený. Před odesláním zkontrolujte údaje.";
    } catch {
      $("draftStatus").textContent =
        "V tomto prohlížeči není použitelný uložený koncept.";
    }
  });
  $("clearDraft").addEventListener("click", () => {
    $("draftStatus").textContent = storage.remove(draftKey)
      ? "Uložený koncept byl smazaný."
      : "Koncept se nepodařilo smazat.";
  });
  function setBusy(value) {
    busy = value;
    $("registrationForm").setAttribute("aria-busy", String(value));
    $("registrationForm")
      .querySelectorAll("input,select,textarea,button")
      .forEach((n) => (n.disabled = value));
    document
      .querySelectorAll("[data-step]")
      .forEach((b) => (b.disabled = value));
    $("retryEmail").disabled = value;
    $("newRegistration").disabled = value;
    $("saveDraft").disabled = value;
    $("restoreDraft").disabled = value;
    $("clearDraft").disabled = value;
    $("sendProgress").hidden = !value;
    $("sendProgress").textContent = value
      ? "Ukládáme přihlášku a připravujeme potvrzení s PDF přílohami…"
      : "";
    if (!value) renumber();
  }
  function showResult(result, p) {
    lastResult = result;
    lastPayload = p;
    $("registrationForm").hidden = true;
    $("successView").hidden = false;
    $("successSchool").textContent =
      p.school + " · " + p.teams.length + " týmů";
    $("registrationId").textContent = result.registration_id;
    summary($("successSummary"), p);
    $("emailTarget").textContent = p.email;
    const state = result.email_state;
    $("emailStatusTitle").textContent =
      state === "sent"
        ? "E-mail byl předán k odeslání"
        : state === "processing"
          ? "E-mail se právě zpracovává"
          : "E-mail zatím není potvrzený";
    $("emailStatusText").textContent =
      result.message +
      (state === "sent"
        ? " Pokud zprávu nevidíte, zkontrolujte spam. Přijetí e-mailovou službou ještě není potvrzení doručení do schránky."
        : "");
    $("retryEmail").hidden = state === "sent";
    $("draftStatus").textContent = "";
    storage.remove(draftKey);
    updateSide();
    $("successTitle").focus();
    $("successView").scrollIntoView({
      behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
      block: "start",
    });
  }
  async function send(p) {
    setBusy(true);
    $("formError").hidden = true;
    const controller = new AbortController(),
      timeout = setTimeout(() => controller.abort(), 55000);
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          request_id: requestId,
          payload: p,
          honeypot: val("website"),
        }),
        signal: controller.signal,
        credentials: "omit",
      });
      let result;
      try {
        result = await response.json();
      } catch {
        throw new Error(
          response.status === 404
            ? "Na hostingu chybí registrační API. Je potřeba nasadit celý projekt."
            : "Server nevrátil čitelné potvrzení. Zkuste to později.",
        );
      }
      if (!response.ok || !result.ok)
        throw new Error(
          response.status === 404
            ? "Registrační služba zatím není nasazená. Kontaktujte organizátora."
            : result.message || "Registraci se nepodařilo přijmout.",
        );
      showResult(result, p);
    } catch (e) {
      $("formError").hidden = false;
      $("formError").textContent =
        e.name === "AbortError"
          ? "Server nestihl vrátit potvrzení. Zkuste znovu odeslat beze změny údajů; použijeme stejný identifikátor přihlášky."
          : e instanceof TypeError
            ? "Nepodařilo se spojit s registračním serverem. Zkontrolujte připojení a zkuste odeslání znovu."
            : e.message;
      $("formError").focus();
    } finally {
      clearTimeout(timeout);
      setBusy(false);
    }
  }
  $("registrationForm").addEventListener("submit", (e) => {
    e.preventDefault();
    if (busy) return;
    for (let i = 0; i < 3; i++)
      if (!validate(i)) {
        go(i);
        return;
      }
    if (val("website")) return;
    lastPayload = payload();
    send(lastPayload);
  });
  $("retryEmail").addEventListener("click", () => {
    if (!busy && lastPayload) send(lastPayload);
  });
  $("newRegistration").addEventListener("click", () => {
    if (busy) return;
    lastResult = null;
    lastPayload = null;
    requestId = uuid();
    $("registrationForm").reset();
    invalidField = null;
    $("registrationForm")
      .querySelectorAll("[aria-invalid]")
      .forEach((f) => f.removeAttribute("aria-invalid"));
    $("registrationForm").hidden = false;
    $("successView").hidden = true;
    $("teams").replaceChildren();
    addTeam();
    go(0);
  });
  $("printConfirmation").addEventListener("click", () => {
    if (!lastResult || !lastPayload) return;
    const p = lastPayload,
      report = $("printReport");
    report.replaceChildren();
    report.append(
      make("div", "VĚDOLIGA", "report-brand"),
      make("h1", "Potvrzení přijetí přihlášky"),
      make("p", lastResult.registration_id),
      make("p", p.school + " · " + p.city),
      make("p", "Kontaktní učitel: " + p.teacher + " · " + p.email),
      make("h2", "Přihlášené týmy"),
    );
    p.teams.forEach((t, i) =>
      report.append(
        make(
          "p",
          i +
            1 +
            ". " +
            t.name +
            " · " +
            t.category +
            " · " +
            t.players +
            " hráčů",
        ),
      ),
    );
    report.append(
      make("h2", "Další postup"),
      make(
        "p",
        "Termín, pravidla a případné startovné ještě potvrdí organizátor. Toto potvrzení nezakládá platební povinnost.",
      ),
      make("p", "info@vedoliga.cz · vedoliga.cz", "signature"),
    );
    window.print();
  });
  const previews = {
    receipt: {
      title: "Potvrzení přihlášky",
      paragraphs: [
        "Registrační číslo vaší školy, kontaktní údaje učitele a přehled přihlášených týmů.",
        "Součástí je preferovaný termín, poznámka pro organizátora a vysvětlení dalšího postupu.",
        "PDF je vytvořené podle odeslaných údajů. Potvrzuje přijetí přihlášky, nikoli finální termín ani platební povinnost.",
      ],
    },
    guide: {
      title: "Pokyny pro učitele",
      paragraphs: [
        "Před soutěží: sestavte týmy po 2 až 5 hráčích a určete hráče, který zadává společné odpovědi.",
        "Technika: připravte zařízení s aktuálním prohlížečem a připojením k internetu. Pro společný trénink zvolte stejné téma, pořadí otázek a limit.",
        "Férový průběh: týmy se mohou radit uvnitř svého týmu, ale během kola nevyhledávají odpovědi a nekopírují je od ostatních.",
        "Tréninkové bodování: správná odpověď 1 bod, chybná nebo chybějící 0 bodů. Při shodném skóre je remíza. Oficiální pravidla potvrdí organizátor.",
        "Kontakt na organizátora a seznam týmů vaší školy najdete přímo v PDF.",
      ],
    },
  };
  document.querySelectorAll("[data-preview]").forEach((b) =>
    b.addEventListener("click", () => {
      const p = previews[b.dataset.preview];
      $("previewTitle").textContent = p.title;
      $("previewContent").replaceChildren(
        ...p.paragraphs.map((t) => make("p", t)),
      );
      $("previewDialog").showModal();
    }),
  );
  $("closePreview").addEventListener("click", () => $("previewDialog").close());
  $("previewDialog").addEventListener("click", (e) => {
    if (e.target === $("previewDialog")) $("previewDialog").close();
  });
})();

(function () {
  const links = [...document.querySelectorAll('.nav a[href^="#"]')];
  const sections = links
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);
  let scheduled = false;
  function update() {
    scheduled = false;
    let current = sections[0];
    for (const section of sections) {
      if (section.getBoundingClientRect().top <= 150) current = section;
    }
    for (const link of links) {
      const active = link.hash === "#" + current.id;
      link.classList.toggle("active", active);
      if (active) link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");
    }
  }
  addEventListener(
    "scroll",
    () => {
      if (!scheduled) {
        scheduled = true;
        requestAnimationFrame(update);
      }
    },
    { passive: true },
  );
  update();
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && document.activeElement?.closest("#nav"))
      document.getElementById("menu").focus();
  });
})();

(function () {
  "use strict";
  const byId = (id) => document.getElementById(id);
  const checks = [...document.querySelectorAll("[data-preflight]")];
  for (const check of checks)
    check.addEventListener("change", () => {
      const count = checks.filter((c) => c.checked).length;
      byId("preflightStatus").textContent =
        count === checks.length
          ? "Vše připraveno. Můžete začít trénink."
          : "Připraveno " + count + " ze " + checks.length + " kroků";
    });
  const presets = {
    class: {
      time: "30",
      order: "fixed",
      text: "Společný trénink: 30 sekund, stejné pořadí otázek. Nastavte stejně všechny týmy.",
    },
    discussion: {
      time: "0",
      order: "fixed",
      text: "Diskuse: bez časovače, stejné pořadí. Nechte týmy vysvětlit své rozhodnutí.",
    },
    practice: {
      time: "60",
      order: "random",
      text: "Vlastní trénink: 60 sekund, náhodné pořadí otázek i odpovědí.",
    },
  };
  for (const button of document.querySelectorAll("[data-preset]"))
    button.addEventListener("click", () => {
      const preset = presets[button.dataset.preset];
      byId("mode").value = preset.time;
      byId("questionOrder").value = preset.order;
      byId("presetStatus").textContent = preset.text;
    });
  for (const id of ["mode", "questionOrder"])
    byId(id).addEventListener("change", () => {
      byId("presetStatus").textContent =
        "Používáte vlastní nastavení uvedené ve formuláři.";
    });
  let scrollBeforeProjection = 0;
  function projection(value) {
    if (value) scrollBeforeProjection = window.scrollY;
    document.body.classList.toggle("projection", value);
    byId("projectionToggle").setAttribute("aria-pressed", String(value));
    byId("projectionToggle").textContent = value
      ? "Ukončit promítání · Esc"
      : "Zapnout promítání ↗";
    if (value) window.scrollTo({ top: 0, behavior: "instant" });
    else window.scrollTo({ top: scrollBeforeProjection, behavior: "instant" });
    byId("projectionToggle").focus({ preventScroll: true });
  }
  byId("projectionToggle").addEventListener("click", () =>
    projection(!document.body.classList.contains("projection")),
  );
  document.addEventListener("keydown", (e) => {
    if (
      e.key === "Escape" &&
      document.body.classList.contains("projection") &&
      !document.querySelector("dialog[open]")
    )
      projection(false);
  });
  const form = byId("registrationForm");
  let dirty = false;
  form.addEventListener("input", () => {
    dirty = true;
  });
  byId("newRegistration").addEventListener("click", () => {
    dirty = false;
  });
  window.addEventListener("beforeunload", (event) => {
    if (dirty && !form.hidden) {
      event.preventDefault();
      event.returnValue = "";
    }
  });
})();
