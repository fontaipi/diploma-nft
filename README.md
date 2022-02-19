# Projet AcLab M2

## LaCathoNFT
L'objectif de ce projet est de permettre à chaque étudiant du l'Université Catholique de Lille de disposer de son diplome sous la forme d'un token ERC721.
L'admnistration aura accès à une interface admin et pourra délivrer les diplômes.

L'adresse du smart contract gérant les diplômes se trouve sur le testnet Rinkeby de la blockchain Ethereum.
Adresse du contract : [0x58606ccb777d70b58f7a68b9ab3e30ae3745e75e](https://rinkeby.etherscan.io/address/0x58606ccb777d70b58f7a68b9ab3e30ae3745e75e)

Les metadonnés des NFTs sont stockés sur IPFS.
Le format des données contenues dans les diplôme sont du type suivant :
```
{
    "diploma_name": "Master MIAGE", 
    "school_name": "Universit\u00c3\u00a9 Catholique de Lille", 
    "year_of_graduation": "2022", 
    "code": "ABCDEFGIJ1234", 
    "description": "...", 
    "image": "https://ipfs.io/ipfs/QmZPaBdJyxdZkcz3b5v85PsH6akCLMiR8Kbd2FXGGKMD8G?filename=Denis-TRUFFAUT-diplome-Master-MIAGE.png", 
    "graduate": 
    {
        "name": "Denis", 
        "lastname": "TRUFFAUT", 
        "date_of_birth": "", 
        "place_of_birth": "Lille", 
        "imdate_of_birthage": "15/02/1998"
    }
}
```

## Environement

1. Installer la dernière version de [python](https://www.python.org/downloads/)
2. Installer [brownie](https://github.com/eth-brownie/brownie)

A la racine du projet il faudra créer un fichier `.env` :\

```
export PRIVATE_KEY=0x_my_private_key
export WEB3_INFURA_PROJECT_ID=web3_infura_project_id
export IPFS_INFURA_PROJECT_ID=ipfs_project_id
export IPFS_INFURA_PROJECT_SECRET=ipfs_project_secret
export ETHERSCAN_TOKEN=etherscan_token
```

`PRIVATE_KEY` : clé privé de votre waller Ethereum préfixé de 0x \
`WEB3_INFURA_PROJECT_ID` : le project id de votre project ethereum infura \
`IPFS_INFURA_PROJECT_ID` : le project id de votre server ipfs infura si vous souhaitez tester de push des métadata \
`IPFS_INFURA_PROJECT_SECRET` : le project secret de votre server ipfs infura si vous souhaitez tester de push des métadata \
`ETHERSCAN_TOKEN` : token API Etherscan si vous souhaitez faire vérifier votre contract \


## Scripts

Il est possible de déployer le contract et de lancer quelques scripts afin de tester les fonctionnalités.
Sinon le contract est disponible sur [etherscan](https://rinkeby.etherscan.io/address/0x58606ccb777d70b58f7a68b9ab3e30ae3745e75e)

1. `deploy_diploma_nft.py` : deploy the contract
2. `mint_diploma.py` : mint an NFT

To run a script `brownie run <path>`


## Tests

`brownie test`


