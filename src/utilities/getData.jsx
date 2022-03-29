// import React, { useState, useEffect } from 'react';
import * as solanaWeb3 from '@solana/web3.js';
import { Metadata } from '@metaplex-foundation/mpl-token-metadata';

    const axios = require('axios')
    
    //DEVNET or MAINNET
    const connection = new solanaWeb3.Connection(solanaWeb3.clusterApiUrl('mainnet-beta'));
    // const connection = new solanaWeb3.Connection(solanaWeb3.clusterApiUrl('devnet'));




    //GET ALL DATA
    const getAllCards=async (address) =>{

        //MAIN-NET BETA ADDRESS
        const PUBLIC_KEY=address

        //DEVNET ADDRESS
        // const PUBLIC_KEY = "E2APdVioPqt8nXFn2Qqu5TKfU2Zp9vB3WP49J7PADWDH"

        let data = await Metadata.findDataByOwner(connection, PUBLIC_KEY)
        let uriData = await Promise.all(data.map(({ data }) => axios.get(data.uri)))

        //GET TIME DATA FROM CONFIRMED SIGNATURES FOR ADDRESS 

        // let acc_add= new solanaWeb3.PublicKey(PUBLIC_KEY)
        // let allSignatures = await connection.getSignaturesForAddress(acc_add)
        // console.log('signature', allSignatures)
        
        // fetch(`https://public-api.solscan.io/account/splTransfers?account=${acc_add}`)
        //       .then(res => res.json())
        //       .then(
        //         (result) => { console.log("result",result)},
                
        //         (error) => {
        //             console.log(error)
        //         }
        //       )
        
        // console.log('all signatures', allSignatures)
        // console.log("all",data,uriData)

        //CREATE CARD OBJECT AND INJECT MINT AND URI DATA
        let cards = data.map(item => {
            const container = {};
            container.mint = item.mint;
            container.uri = item.data.uri;
            return container;
        })

        //INJECT DATA FROM URI RETURNED DATA
        cards.forEach((card, index) => {
            let numEdition
            card.imageUrl=uriData[index].data.image
            
            card.name=uriData[index].data.name
                let numChar=card.name.indexOf("#")
                if (numChar){
                    let tempName = card.name
                    numEdition=tempName.slice(numChar)
                    card.name=card.name.slice(0,numChar)
                }else {numEdition=''}
            card.numEdition=numEdition
            card.isFavorite=false
            card.key=index
            card.id=index
        })

    return cards;
  }


export { getAllCards }
