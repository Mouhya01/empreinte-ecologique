//ETAPE1: Recuperation des element via le DOM

const transport_individuel=document.getElementById("voiture")
const transport_collectif=document.getElementById("bus")
const transport_aerien=document.getElementById("vols")
const energie_consomme=document.getElementById("electricite")
const appareils_electronique=document.getElementById("appareils")

// Pour recuperer la reponse de l'utilisateur sur le bouton checbox
const energieRenouvelable=document.getElementById("renouvelable")

// Pour recuperer le choix de l'utilisateur sur la liste déroulante
const alimentation_viande=document.getElementById("viande")

//recuperation des bouton
const boutonEnvoyer=document.getElementById("submit-btn")
const boutonReset=document.getElementById("reset-btn")

//Recuperation des section resultats vide du HTML
const empreinteValeur=document.querySelector(".footprint-value")
const comparaisonValeur=document.querySelector(".comparison-value")
const recommandation=document.querySelector(".conseils")

//ETAPE2: GESTION DES EVENEMENTS

//Premier type d'évenement: La saisie des input
transport_individuel.addEventListener("input",function(){
    console.log(`Vous avez parcouru ${transport_individuel.value} km en voitures par semaine`)
})

transport_collectif.addEventListener("input",function(){
    console.log(`Vous avez parcouru ${transport_collectif.value} km en bus par semaine`)
})

transport_aerien.addEventListener("input",function(){
    console.log(`Vous avez fait ${transport_aerien.value} vols durant cette année`)
})

energie_consomme.addEventListener("input",function(){
    console.log(`Vous consommez ${energie_consomme.value} kWh d'electricité par mois`)
})

appareils_electronique.addEventListener("input",function(){
    console.log(`Vous achetez ${appareils_electronique.value} appareils electronique par an`)
})

//Deuxieme type d'événement: Les selections
energieRenouvelable.addEventListener("change",function(){
    if(energieRenouvelable.checked){
        console.log("Vous utilisez bien de l'energie renouvelable")
    }else{
        console.log("Vous n'utilisez pas d'energie renouvelable")
    }
})

alimentation_viande.addEventListener("change",function(){
    console.log(`Vous consommer ${alimentation_viande.value} de la viande`)
})

//Troiseme type d'evenement: Les clicks de bouton

boutonEnvoyer.addEventListener("click", function(){
    event.preventDefault()
    calculerEmpreinte()
})

boutonReset.addEventListener("click",function(){
    console.log("Votre formulaire a été reinitialise avc succés")
})


//creation de la fonction empreinte
function calculerEmpreinte(){
    const kmVoiture=Number(transport_individuel.value)|| 0
    const kmBus=Number(transport_collectif.value) || 0
    const nbVols=Number(transport_aerien.value) || 0
    const electricite=Number(energie_consomme.value) || 0
    const nbAppareils=Number(appareils_electronique.value) || 0
    const viande_consommation=alimentation_viande.value
    
    //Conversion des donnée
    const kmVoitureParAn=kmVoiture*52
    const kmBusParAn=kmBus*52
    const electriciteParAn=electricite*12

    //calcul des empreinte par facteur avec les coefficients
    
    const empreinteVoiture=kmVoitureParAn*0.17
    const empreinteBus=kmBusParAn*0.1
    const empreinteAvion=nbVols*250
    const empreinteElectricite= electriciteParAn*0.3
    const empreinteAppareil=nbAppareils*100

    const empreinteTotal= empreinteAppareil+empreinteBus+empreinteElectricite+empreinteAvion+empreinteVoiture

    //Verification des bonus/malus
    let empreinteTotalFinal=empreinteTotal //on convertie en tonne de CO2 par an
    //1. Augmentation selon la frequence de viande
    if(viande_consommation === "souvent"){empreinteTotalFinal *= 1.20}
    else if(viande_consommation === "parfois"){empreinteTotalFinal *= 1.10}
    else if(viande_consommation === "rarement"){empreinteTotalFinal *= 1.05}
    else if(viande_consommation === "jamais"){empreinteTotalFinal *= 1}

    //2. Reduction pour l'energie renouvelable
    if(energieRenouvelable.checked){
        const empreinteElectriciteCorrige=empreinteElectricite*0.5
        empreinteTotalFinal=empreinteTotalFinal-empreinteElectricite+empreinteElectriciteCorrige
    }
    empreinteTotalFinal/=1000
    empreinteValeur.textContent=empreinteTotalFinal.toFixed(2)
    const nbTerre=empreinteTotalFinal/1.7
    comparaisonValeur.textContent=nbTerre.toFixed(1)

    if(empreinteTotalFinal<2){
        recommandation.innerText="👏 Félicitation, vous avez une empreinte ecologique inférieur a la moyenne preuve de votre contribution au bien-etre de notre planéte!!"
    }else if(empreinteTotalFinal<=5){
        recommandation.innerText="🌱 Vous êtes dans la moyenne, continuez vos efforts!!"
    }else{
        recommandation.innerText="⚠️ Attention, votre empreinte ecologique est élevée, pensez a la reduire pour le bien de notre planéte"
    }
    
}   