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
    console.log("Votre formulaire a été envoye avec succés")
})

boutonReset.addEventListener("click",function(){
    console.log("Votre formulaire a été reinitialise avc succés")
})
