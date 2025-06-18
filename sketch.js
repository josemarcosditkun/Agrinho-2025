let personagem;
let itens = [];
let velocidade = 5;

function setup() {
  createCanvas(600, 400);
  personagem = new Personagem();
  // Criar alguns itens para coletar
  for (let i = 0; i < 10; i++) {
    itens.push(new Item());
  }
}

function draw() {
  background(135, 206, 235); // Céu azul

  // Desenhar o personagem
  personagem.mover();
  personagem.exibir();

  // Mostrar e verificar colisões com os itens
  for (let i = itens.length - 1; i >= 0; i--) {
    itens[i].exibir();
    if (personagem.colidiu(itens[i])) {
      itens.splice(i, 1); // Remove o item coletado
    } else if (itens[i].y > height) {
      // Se o item passar do chão, reaparece no topo
      itens[i] = new Item();
    }
  }

  // Mostrar mensagem de pontuação
  fill(0);
  textSize(16);
  text('Itens coletados: ' + (10 - itens.length), 10, 20);
}

// Classe do personagem
class Personagem {
  constructor() {
    this.x = width / 2;
    this.y = height - 50;
    this.size = 40;
  }

  mover() {
    if (keyIsDown(LEFT_ARROW)) {
      this.x -= velocidade;
    }
    if (keyIsDown(RIGHT_ARROW)) {
      this.x += velocidade;
    }
    // Limitar dentro da tela
    this.x = constrain(this.x, 0 + this.size / 2, width - this.size / 2);
  }

  exibir() {
    fill(139, 69, 19); // Cor marrom para o personagem
    rectMode(CENTER);
    rect(this.x, this.y, this.size, this.size);
  }

  colidiu(item) {
    let d = dist(this.x, this.y, item.x, item.y);
    return d < (this.size / 2 + item.size / 2);
  }
}

// Classe dos itens
class Item {
  constructor() {
    this.x = random(20, width - 20);
    this.y = random(-100, -20);
    this.size = 20;
    this.speed = random(2, 4);
  }

  exibir() {
    fill(34, 139, 34); // Cor verde para o item
    ellipse(this.x, this.y, this.size);
    this.y += this.speed;
  }
}