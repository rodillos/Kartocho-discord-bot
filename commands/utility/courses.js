const { SlashCommandBuilder } = require('discord.js');
const CupList =  require('../../courses/coursesList.js');
const { count } = require('console');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('pista')
		.setDescription('Devuelve N pistas al azar')
		.addIntegerOption(option =>
			option
				.setName('cuantas')
				.setDescription('La cantidad de pistas')),

	async execute(interaction) {
		//falta agregar el receptor del input
		const amount = interaction.options.getInteger('cuantas') || 8;

		//TODO: evitar que salgan dos pistas de la misma copa seguidas
		//TODO: random espejo

		const resultados = getRandomCourse(amount, interaction.user.username);
		const replyMessage = resultados
		.map((result, index) => `${index + 1}. Copa: ${result.cupName} - ${result.course} ${result.dlc ? ' - DLC' : ''}`)
		.join('\n');
	
		// Enviar respuesta
		await interaction.reply(`Aquí tienes ${amount} pistas aleatorias:\n${replyMessage}`);
	},
};

  // Función para obtener un course aleatorio junto con su cupName
  function getRandomCourse(count, userName) {
	let randomCourses = [];
	let index = 0;

	if(count > 48){ return [{cupName: 'Clown (25)', course: userName, dlc: true}];}
	
	const courseWithCupName = CupList?.flatMap(cup => {
		index++;
	  return cup.courses.map(course => ({ 
		cupName: `${cup.cupName} (${index})`, 
		dlc: cup.dlc, 
		course }))
	});

	// Mezclar los elementos de forma aleatoria
	const shuffledCourses = shuffle(courseWithCupName);
  
	// Tomar los primeros `count` elementos
	return shuffledCourses.slice(0, count);
  }

  function shuffle(array) {
	let arrayAux = [...array]; //para no modificar el original
	for (let i = arrayAux.length - 1; i > 0; i--) {
	  let j = Math.floor(Math.random() * (i + 1)); // Índice aleatorio entre 0 e i
	  [arrayAux[i], arrayAux[j]] = [arrayAux[j], arrayAux[i]]; // Intercambia elementos
	}
	return arrayAux;
  }
  