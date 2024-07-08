const competitor1 = {
  NOME: "Mario",
  VELOCIDADE: 4,
  MANOBRABILIDADE: 3,
  PODER: 3,
  PONTOS: 0,
};
const competitor2 = {
  NOME: "Peach",
  VELOCIDADE: 3,
  MANOBRABILIDADE: 4,
  PODER: 2,
  PONTOS: 0,
};
const competitor3 = {
  NOME: "Yoshi",
  VELOCIDADE: 2,
  MANOBRABILIDADE: 4,
  PODER: 3,
  PONTOS: 0,
};
const competitor4 = {
  NOME: "Browser",
  VELOCIDADE: 5,
  MANOBRABILIDADE: 2,
  PODER: 5,
  PONTOS: 0,
};
const competitor5 = {
  NOME: "Luigi",
  VELOCIDADE: 3,
  MANOBRABILIDADE: 4,
  PODER: 4,
  PONTOS: 0,
};
const competitor6 = {
  NOME: "Donkey Kong",
  VELOCIDADE: 2,
  MANOBRABILIDADE: 2,
  PODER: 3,
  PONTOS: 0,
};
const competitors = [
  competitor1,
  competitor2,
  competitor3,
  competitor4,
  competitor5,
  competitor6,
];

let players = Array;
while (players.length < 2) {
  const a = Math.floor(Math.random() * competitors.length);
  const b = Math.floor(Math.random() * competitors.length);

  let player1 = competitors[a];
  let player2 = competitors[b];

  if (player1 != player2) {
    players = [player1, player2];
  } else {
    delete player1;
    delete player2;
  }
}

async function rollDice() {
  return Math.floor(Math.random() * 6) + 1;
}

async function getRandomBlock() {
  let random = Math.random();
  let result;

  switch (true) {
    case random < 0.33:
      result = "RETA";
      break;

    case random < 0.66:
      result = "CURVA";
      break;

    default:
      result = "CONFRONTO";
  }

  return result;
}

async function raffleTurbo() {
  let random = Math.random();
  let result;

  switch (true) {
    case random < 0.2:
      result = "TURBO";
      break;

    default:
      result = "";
  }

  return result;
}

async function rafflePower() {
  let random = Math.random();
  let result = [];

  switch (true) {
    case random < 0.5:
      result = [(namePower = "BOMBA"), (power = 2)];
      break;

    default:
      result = [(namePower = "CASCO"), (power = 1)];
  }

  return result, power;
}

async function logRollResult(
  characterName,
  block,
  diceResult,
  attribute,
  power
) {
  if (block === "poder") {
    console.log(
      `${characterName} 🎲 rolou um dado de ${block} ${diceResult} + ${attribute} + ${power} = ${
        diceResult + attribute + power
      }`
    );
  } else {
    console.log(
      `${characterName} 🎲 rolou um dado de ${block} ${diceResult} + ${attribute} = ${
        diceResult + attribute
      }`
    );
  }
}

async function playRaceEngine(character1, character2) {
  for (let round = 1; round <= 5; round++) {
    console.log(`🏁 Rodada ${round}`);

    // sortear bloco
    let block = await getRandomBlock();
    console.log(`Bloco: ${block}`);

    // rolar os dados
    let diceResult1 = await rollDice();
    let diceResult2 = await rollDice();

    //teste de habilidade
    let totalTestSkill1 = 0;
    let totalTestSkill2 = 0;

    if (block === "RETA") {
      totalTestSkill1 = diceResult1 + character1.VELOCIDADE;
      totalTestSkill2 = diceResult2 + character2.VELOCIDADE;

      await logRollResult(
        character1.NOME,
        "velocidade",
        diceResult1,
        character1.VELOCIDADE
      );

      await logRollResult(
        character2.NOME,
        "velocidade",
        diceResult2,
        character2.VELOCIDADE
      );
    }

    if (block === "CURVA") {
      totalTestSkill1 = diceResult1 + character1.MANOBRABILIDADE;
      totalTestSkill2 = diceResult2 + character2.MANOBRABILIDADE;

      await logRollResult(
        character1.NOME,
        "manobrabilidade",
        diceResult1,
        character1.MANOBRABILIDADE
      );

      await logRollResult(
        character2.NOME,
        "manobrabilidade",
        diceResult2,
        character2.MANOBRABILIDADE
      );
    }

    if (block === "CONFRONTO") {
      let rafflePower1 = await rafflePower();
      let rafflePower2 = await rafflePower();
      let powerResult1 = diceResult1 + character1.PODER + rafflePower1;
      let powerResult2 = diceResult2 + character2.PODER + rafflePower2;

      console.log(`${character1.NOME} confrontou com ${character2.NOME}! 🥊`);

      await logRollResult(
        character1.NOME,
        "poder",
        diceResult1,
        character1.PODER,
        rafflePower1
      );

      await logRollResult(
        character2.NOME,
        "poder",
        diceResult2,
        character2.PODER,
        rafflePower2
      );

      if (powerResult1 > powerResult2 && character2.PONTOS > 0) {
        character2.PONTOS--;
        let especial = raffleTurbo();
        if (especial === "TURBO") {
          character1.PONTOS++;
          console.log(
            `${character1.NOME} venceu o confronto e ganhou turbo (+ 1 ponto)! ${character2.NOME} perdeu 1 ponto 🐢`
          );
        } else {
          console.log(
            `${character1.NOME} venceu o confronto! ${character2.NOME} perdeu 1 ponto 🐢`
          );
        }
      }
      if (powerResult2 > powerResult1 && character1.PONTOS > 0) {
        character1.PONTOS--;
        let especial = raffleTurbo();
        if (especial === "TURBO") {
          character2.PONTOS++;
          console.log(
            `${character2.NOME} venceu o confronto e ganhou turbo (+ 1 ponto)! ${character1.NOME} perdeu 1 ponto 🐢`
          );
        } else {
          console.log(
            `${character2.NOME} venceu o confronto! ${character1.NOME} perdeu 1 ponto 🐢`
          );
        }

        console.log(
          powerResult2 === powerResult1
            ? "Confronto empatado! Nenhum ponto foi perdido"
            : ""
        );
      }
    }

    // verificando o vencedor
    if (totalTestSkill1 > totalTestSkill2) {
      console.log(`${character1.NOME} marcou um ponto!`);
      character1.PONTOS++;
    } else if (totalTestSkill2 > totalTestSkill1) {
      console.log(`${character2.NOME} marcou um ponto!`);
      character2.PONTOS++;
    }

    console.log("-----------------------------");
  }
}

async function declareWinner(character1, character2) {
  console.log("Resutado Final:");
  console.log(`${character1.NOME}: ${character1.PONTOS} ponto(s)`);
  console.log(`${character2.NOME}: ${character2.PONTOS} ponto(s)`);

  if (character1.PONTOS > character2.PONTOS) {
    console.log(`\n${character1.NOME} venceu a corrida! 🏆`);
  } else if (character1.PONTOS < character2.PONTOS) {
    console.log(`\n${character2.NOME} venceu a corrida! 🏆`);
  } else {
    console.log(`${character1.NOME} e ${character2.NOME} empataram a corrida.`);
  }
}

(async function () {
  console.log(
    `🏁🚨 Corrida entre ${players[0].NOME} e ${players[1].NOME} começando...\n`
  );
  await playRaceEngine(players[0], players[1]);
  await declareWinner(players[0], players[1]);
})();
