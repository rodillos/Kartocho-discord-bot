const { SlashCommandBuilder } = require('discord.js');
const CupList =  require('../../courses/coursesList.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('pista8')
		.setDescription('Devuelve 8 pistas al azar'),
	async execute(interaction) {
		const resultados = getRandomCourse(8);
		const replyMessage = resultados
		.map((result, index) => `Pista ${index + 1}. ${result.course} (Copa: ${result.cupName}), ${result.dlc ? 'E' : 'No e'}s del DLC`)
		.join('\n');
	
		// Enviar respuesta
		await interaction.reply(`Aquí tienes 8 pistas aleatorias:\n${replyMessage}`);
	},
};

module.exports.pista16 = {
	data: new SlashCommandBuilder()
	  .setName('pista16')
	  .setDescription('Devuelve 16 pistas al azar'),
	async execute(interaction) {

	  const resultados = getRandomCourses(16);

	  const replyMessage = resultados
		.map((result, index) => `Pista ${index + 1}. ${result.course} (Copa: ${result.cupName}), ${result.dlc ? 'E' : 'No e'}s del DLC`)
		.join('\n');

	  await interaction.reply(`Aquí tienes 16 pistas aleatorias:\n${replyMessage}`);
	},
  };

  // Función para obtener un course aleatorio junto con su cupName
  function getRandomCourse(count) {
	// Crear una lista de objetos que vincule cada course con su cupName
	const courseWithCupName = CupList?.flatMap(cup => 
	  cup.courses.map(course => ({ cupName: cup.cupName, dlc: cup.dlc, course }))
	);
  
	// Mezclar los elementos de forma aleatoria
	const shuffledCourses = courseWithCupName.sort(() => Math.random() - 0.5);
  
	// Tomar los primeros `count` elementos
	return shuffledCourses.slice(0, count);
  }