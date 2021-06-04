// Rotary Encoder Inputs
#define SW 23
#define DT 22
#define CLK 21

int pinA = CLK;
int pinB = DT;
int aState;
int aLastState;

void setup() {
  pinMode(pinA, INPUT);
  pinMode(pinB, INPUT);
  Serial.begin(9600);
  // Starts output
  aLastState = digitalRead(pinA);
}

void loop() {
  aState = digitalRead(pinA);

  if (aState != aLastState) {
    // outputB != outputA state, encoder is rotating clockwise
    if (digitalRead(pinB) != aState) {
        Serial.println("L");
      // counter ++;
    } else {
      // counter --;
        Serial.println("R");
    }
  }

  aLastState = aState;
}
