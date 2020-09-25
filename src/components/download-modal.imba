import './youtube-embed'

tag download-modal

	prop title = "Modal title"
	prop showModal = true
	prop downloadLink = null
	prop deckName

	def pressedIcon
		showModal = true

	get navigator do window.navigator
	

	def patreonIntro
		'https://www.youtube.com/embed/EoB_zj7jeEk'
	
	def patreonIntroTitle
		"Patreon Intro 🧡"		

	<self[d: flex fld: column]>
		if showModal
			<.modal[d: flex]>
				<.modal-background>
				<.modal-card>
					<header.modal-card-head>
						<p.modal-card-title> title
						<button.delete aria-label="close" @click.{showModal=false}>
					<section.modal-card-body>
						<.has-text-centered>
							<a[m: 2rem].button.is-primary href=downloadLink @click.didDownload download=deckName> "Click to Download"
							<h3 .title .is-3> "Support this project"
							<hr>
							<p> "This deck is brought to you by our amazing {<a href="https://www.patreon.com/alemayhu"> "patrons"} 🧡"
							<a.button[bd: 1px solid rgb(45, 124, 218) bg: rgb(45, 124, 218) c: white border-radius: 0.3rem] target="_blank" href="https://www.patreon.com/alemayhu">
								<span[fw: bold]> "Become a Patron"