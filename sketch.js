function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
}
let jogador;
let objetos = [];
let pontos = 0;
let vida = 3;
let frutas = ['🍎', '🍌', '🍓', '🍊'];
let lixos = ['🗑️', '🪣', '♻️'];

function setup() {
  createCanvas(600, 400);
  jogador = new Jogador();
  textAlign(CENTER, CENTER);
}

function draw() {
  background(180, 230, 180);

  // Mostrar pontuação e vida
  fill(0);
  textSize(20);
  text("Pontos: " + pontos, 80, 30);
  text("Vida: " + vida, width - 80, 30);

  jogador.mostrar();
  jogador.mover();

  if (frameCount % 30 === 0) {
    objetos.push(new Objeto());
  }

  for (let i = objetos.length - 1; i >= 0; i--) {
    objetos[i].cair();
    objetos[i].mostrar();

    if (objetos[i].atingiu(jogador)) {
      if (objetos[i].tipo === "fruta") {
        pontos++;
      } else {
        vida--;
      }
      objetos.splice(i, 1);
    } else if (objetos[i].y > height) {
      objetos.splice(i, 1);
    }
  }

  if (vida <= 0) {
    noLoop();
    fill(0);
    textSize(36);
    text("Fim de Jogo! Pontuação: " + pontos, width / 2, height / 2);
  }
}

class Jogador {
  constructor() {
    this.x = width / 2;
    this.y = height - 40;
    this.largura = 60;
  }

  mostrar() {
    fill(255, 200, 0);
    rect(this.x, this.y, this.largura, 20, 10);
    textSize(20);
    text("👨‍🌾", this.x + this.largura / 2, this.y - 10);
  }

  mover() {
    if (keyIsDown(LEFT_ARROW)) {
      this.x -= 5;
    }
    if (keyIsDown(RIGHT_ARROW)) {
      this.x += 5;
    }
    this.x = constrain(this.x, 0, width - this.largura);
  }
}

class Objeto {
  constructor() {
    this.x = random(20, width - 20);
    this.y = 0;
    this.velocidade = 4;
    this.tipo = random() < 0.7 ? "fruta" : "lixo";
    this.emoji = this.tipo === "fruta" ? random(frutas) : random(lixos);
  }

  cair() {
    this.y += this.velocidade;
  }

  mostrar() {
    textSize(30);
    text(this.emoji, this.x, this.y);
  }

  atingiu(jogador) {
    return (
      this.y > jogador.y &&
      this.x > jogador.x &&
      this.x < jogador.x + jogador.largura
    );
  }
}
