<h1 align="center">RPSLS Game</h1>

<br />

To run the project, you need to perform the following steps:

```bash
cd frontend
```

<br />

Update the env file with the following params:

```bash
NEXT_PUBLIC_REOWN_PROJECT_ID="" # See -> https://cloud.reown.com/
UPSTASH_REDIS_REST_URL="" # See -> https://console.upstash.com/redis/
UPSTASH_REDIS_REST_TOKEN=""
```

<br />

Then run the following command to install the dependencies:

```bash
npm run install
```

<br />

Finally, run the following command to start the development server:

```bash
npm run dev
```

<br />
<br />

<h1 align="center">How to play</h1>

<ol>
<li style="font-size: 17px;">
Player 1 will select the first move and enter the address of the Player 2
</li>
<li style="font-size: 17px;">
Player 1 will have to encrypt the number using his encryption public key and then sign a transaction to deploy the new contract for new game with his wallet
</li>
<li style="font-size: 17px;">
After player 1 has played it's move, player 2 will have the chance to play their move and submit a transaction to the contract
</li>
<li style="font-size: 17px;">
After player 2 has played it's move, player 1 will reveal their move by decrypting the encrypted number and then selecting the same move that they selected before. After that, a trnsaction will be submitted to the contract with the random number and the move
</li>
<li style="font-size: 17px;">
Winning amount will be sent to the address based on who won.
</li>
<li style="font-size: 17px;">
There are some timeouts for both the players and if they didn't submit their move in time, the game will be not be played anymore and anyone can decide to sign the transaction and select the other party as winner.
</li>
<li style="font-size: 17px;">
To end the game click on restart game and then the game will be ended and you can play the new game again.
</li>
</ol>
