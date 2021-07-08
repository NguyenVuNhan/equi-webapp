<p align="center">
  <h3 align="center">Equi</h3>
  <p align="center"> VirTUe house smart dashboard - Equi</p>
</p>

<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li>
    <a href="#usage">Usage</a>
      <ul>
        <li><a href="#load-the-code-to-teensy">load the code to teensy</a></li>
      </ul>
    </li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

<p align="center">
    <img src="assets/equi_demo.png" alt="Equi_screenshot" width="500"/>
</p>

As a part of VirTUe smart and sustainable house, Equi is the dashboard which responsible for helping the user to control the house and also give the house status in realtime.
The Equi application constituted by 3 main parts:

- The front-end - which responsible for rendering the view
- The teensy controller - which read the signal from physic rotator and send feedback signal to equi
- The librium - which is the brain of Equi.
  This allow equi to help the user schedule appliances. Process all house input and react with on the librium smart algorithm.

### Build With

- [React](https://reactjs.org/)
- [Python](https://www.python.org/)
- [C/C++](https://www.cplusplus.com/)
- [Arduino](https://www.arduino.cc/)

<!-- GETTING STARTED -->

## Getting Started

### Prerequisites

To be able to run the application, it required you to install these tools:

- [nodejs](https://nodejs.org/en/)
- [python 3](https://www.python.org/downloads/)

If you want to interact with the physical rotator, it would required:

- A physical [Teensy 4.1](https://www.pjrc.com/teensy/) board
- [Arduino IDE](https://www.arduino.cc/en/software) and install [Teensyduino](https://www.pjrc.com/teensy/teensyduino.html)

### Installation

One your have all the requirement tools and software, you can run these command to install the requirement dependencies.

Install all the packages for nodejs

```bash
$ npm install
```

Install the requirement packages for python

```bash
$ python3 -m venv ./.venv
$ source ./.venv/bin/activate
$ pip install -r requirements.txt
```

<!-- USAGE EXAMPLES -->

## Usage

Run the librium server

```bash
$ source ./.venv/bin/activate
$ npm run nx run librium:serve
```

In case you want to interact with the physical rotator, it would required to load the code to teensy board first (see [Load the code to teensy](#load-the-code-to-teensy)]) then run the teensy server with this command

```bash
$ source ./.venv/bin/activate
$ npm run nx run teensy:serve
```

And finally, start the Equi interface

```bash
$ npm run nx run equi:serve
```

You can run many projects in parallel with this command:

```bash
$ source ./.venv/bin/activate
$ yarn nx run-many --target=serve --projects=equi,librium,teensy --parallel
```

Note: This command `source ./.venv/bin/activate` use to trigger the python environment before executing the script.
If you use only one shell session, then you will need to run this command only one time.

### Load the code to teensy

Open the file `apps/potentionmeter/potentionmeter.ino` with the arduino IDE that you have install in the earlier step.

Follow this guide for the [Basic Teensyduino Usage](https://www.pjrc.com/teensy/td_usage.html).
After this, you should be able to load the code to the teensy board with the arduino IDE.

Once finished, plug the teensy board to your computer and start the teensy serve.

## Contact

In case you have any question, contact @NguyenVuNhan for answer
email: nguyenvunhan1999@gmail.com
