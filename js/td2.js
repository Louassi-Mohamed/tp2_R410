/**
* 
* M413 - TD2
* * 
* 	@author Jean-Michel Bruneau
*	@copyright UCA - IUT -INFO
* 	@version	1.0
* 	@date			2021-01-31
*
*/
"use strict";

// M413 - TD2
let message = 'JavaScript is ok :)';
// alert( message);
console.log(message);

function onLoad() {
	initSelect();
	addDivToBody();
	insertElement();
	const btRecherche = document.getElementById("btnsearch");
	btRecherche.addEventListener("click", onBtRechercheClick);
	console.log('Processus de chargement du document terminé…');
}

// Toute les ressources de la page sont complètement chargées.
window.onload = onLoad;

let newElement = null;

function insertElement(target) {
	debugger
	if (newElement) {
		newElement.remove();
	}

	const insertType = document.querySelector("#insert-type").value;
	const insertText = document.querySelector("#insert-text").value;

	newElement = document.createElement(insertType);
	newElement.textContent = insertText;

	target.parentNode.insertBefore(newElement, target);

}

let originalContent = null;

function onBtRechercheClick() {

	const searchInput = document.getElementById("inputSearch");

	// Ajouter un écouteur d'événement pour le clic sur le bouton de recherche
	const searchText = searchInput.value.trim();
	console.log(searchText);
	// Si le texte est vide, ne rien faire
	if (searchText.length === 0) {
		return;
	}

	// Vérifier si le contenu original de la page a déjà été sauvegardé
	if (originalContent === null) {
		// Si ce n'est pas le cas, sauvegarder le contenu du corps de la page
		originalContent = document.body.innerHTML;
	}

	// Créer un nouvel élément div pour contenir le contenu original de la page
	const originalContentDiv = document.createElement('div');
	originalContentDiv.innerHTML = originalContent;

	// Chercher le texte souhaité dans toute la page à l'aide d'une expression régulière
	const regex = new RegExp(searchText, 'gi');
	const matches = originalContentDiv.innerHTML.match(regex);

	// Si des correspondances sont trouvées...
	if (matches !== null) {
		for (let i = 0; i < matches.length; i++) {
			const match = matches[i];
			// Remplacer chaque occurrence du texte par une balise <span> avec la classe CSS "select"
			console.log(match);
			document.body.innerHTML = originalContentDiv.innerHTML.replace(
				new RegExp(match, 'g'),
				'<span class="surligner">' + match + '</span>');
			console.log(originalContentDiv.innerHTML);
		}
	}

	console.log("Le bouton de recherche a été cliqué!");
}

let isClicked = false;

function initSelect() {
	document.querySelector("body").addEventListener("click", select);
}

// function select (event) {
// 	// debugger
// 	if (isClicked) {
// 		isClicked = false;
// 		event.target.style.backgroundColor = "";
// 		console.log(isClicked + " false")
// 	} else {
// 		isClicked = true;
// 		event.target.style.backgroundColor = "red";
// 		console.log(isClicked + " true")
// 	}
// };


function select(event) {
	const parentElement = event.target.parentNode;
	if (event.target.style.backgroundColor !== "red") {
		event.target.style.backgroundColor = "red";
		parentElement.style.backgroundColor = "orange"
		console.log(parentElement)
		console.log('passage au rouge');
	}
	else {
		// event.target.closest.backgroundColor = ""
		event.target.style.backgroundColor = "";
		parentElement.style.backgroundColor = ""
		console.log('passage au vide');
	}

};

function addDivToBody() {
	const div = document.createElement('div');
	div.setAttribute('id', 'insert-div');

	// Création du select
	const select = document.createElement('select');
	select.setAttribute('id', 'insert-type');
	select.setAttribute('name', 'type');

	// Ajout des options dans le select
	const divOption = document.createElement('option');
	divOption.setAttribute('value', 'div');
	divOption.textContent = 'div';
	const pOption = document.createElement('option');
	pOption.setAttribute('value', 'p');
	pOption.textContent = 'p';
	const spanOption = document.createElement('option');
	spanOption.setAttribute('value', 'span');
	spanOption.textContent = 'span';

	select.appendChild(divOption);
	select.appendChild(pOption);
	select.appendChild(spanOption);

	// Création de l'input
	const input = document.createElement('input');
	input.setAttribute('type', 'text');
	input.setAttribute('id', 'insert-text');
	input.setAttribute('value', 'My New Text Element');

	// Ajout du select et de l'input dans la div
	div.appendChild(select);
	div.appendChild(input);

	// Insertion de la div au début du body
	const body = document.querySelector('body');
	body.insertBefore(div, body.firstChild);
}


let selectedElement = null;

function select2(event) {
	if (selectedElement) {
		selectedElement.classList.remove('blue');
	}

	// Vérifier si la cible est cliquable ou non
	const isClickable = !event.target.closest('#insert-div');

	if (selectedElement !== event.target && isClickable) {
		event.target.classList.add('blue');
		selectedElement = event.target;
	} else {
		selectedElement = null;
	}
	if (event.target == document.getElementById('insert-div')) {
		insertElement(event.target)
	}

}


