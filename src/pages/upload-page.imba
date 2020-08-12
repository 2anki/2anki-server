import '../components/page-content'
import '../components/n2a-button'
import '../components/progress-bar'

import {upload_path} from '../server/endpoints'

tag upload-page

	prop downloadLink = null
	prop errorMessage = null
	prop deckName = null
	prop state = 'ready'
	prop progress = 0
	prop fontSize = 20
	
	def convertFile event
		unless state == 'ready'
			return
		state = 'uploading'
		errorMessage = null
		try
			const form = event.target
			const formData = new FormData(form)
			const request = await window.fetch(upload_path(window.location.hostname), {method: 'post', body: formData})
			console.log(request.headers)
			if request.status != 200 # OK
				const text = await request.text()
				errorMessage = "status.code={request.status}\n{text}"
				return errorMessage
			console.log($input)
			const inputName = $input.value
			deckName = inputName ? "{inputName}.apkg" : "{window.btoa(new Date()).substring(0, 7)}.apkg".replace(/\s/g, '-')
			const blob = await request.blob()
			downloadLink = window.URL.createObjectURL(blob)
		catch error
			errorMessage = error ? "<h1 class='title is-4'>{error.message}</h1><pre>{error.stack}</pre>" : ""

	def didDownload
		downloadLink = null
		state = 'ready'
	
	def fileSelected
		$selectorBackground.style.background="mediumseagreen"
		$selectorLabel.textContent = "File Selected"
		let filePath = $selectorInput.value
		let selectedFile = filePath.split(/(\\|\/)/g).pop()
		$selectorFileName.textContent = selectedFile

	def render
		<self>
			<.section>
				<.container>
					<h1.title> "Pick your options"
					<hr>
					<p.subtitle> "Only the zip or HTML file is required. Please use the exported ZIP file to get all your images."
					<form enctype="multipart/form-data" method="post" @submit.prevent=convertFile>
						<h3 .title .is-3> "Deck Name" 
						<input$input.input[fw: bold c: #83C9F5 @placeholder: grey] placeholder="Enter deck name (optional)" name="deckName" type="text">
						<h3[mt: 2rem] .title .is-3> "Font Size" 
						<input bind=fontSize name='font-size' hidden>
						<p[mb: 1rem]> "Select a fonts size for your card by clicking on it."
						<div[d: grid jc: start]>
							<div[bd: 1px solid lightgray br: 5px p: 0]>
								<p> for fontPreset in [32, 26, 20, 12, 10]
										<span[fs: {fontPreset}px p: 3px br: 5px m: 0 8px] [c: #00d1b2]=(fontPreset == fontSize) @click.{fontSize = fontPreset}> "Aa"
							<p[fs: {fontSize}px white-space: nowrap mt: 1rem]> "👁 font size preview..."
						<h3[mt: 2rem] .title .is-3> "Card Types" 
						<div[mt: 1rem].control.has-icons-left>
							<div.select.is-medium>
								<.select> 
									<select$cardType name="card-type">
										<option value="cloze"> "Cloze deletion"
										<option value="basic"> "Basic front and back"
										<option value="basic-reversed"> "Basic and reversed"
										<option value="reversed"> "Just the reversed"
							<div[mt: 1rem]>
								<p.subtitle> "Cloze deletions are so powerful that they are now the default in notion2Anki but you can change that in the picker.  You can use them in the toggle header. No worries, basic cards still work and you can mix them. See example below:" 
								<p.subtitle> "Code blocks are treated as cloze when you pick cloze deletion. On macOS the shortcut is {<strong> "CMD+E"} or {<strong> "CTRL+E"} for other platforms."
								<img alt="screenshot of cloze example" src="/cloze_example.png">
							<span.icon.is-large.is-left>
								<i.fas.fa-chalkboard>
						<h3[mt: 2rem] .title .is-3> "Media Options" 
						<p.has-text-centered .subtitle> "Coming soon"
						<.has-text-centered>
							<p> "Join the Discord server to get notified of changes!"
							<a.button target="_blank" href="https://discord.gg/PSKC3uS">
								<span.icon>
									<i.fab.fa-discord>
								<span> "Discord"
						<h3[mt: 2rem] .title .is-3> "Notion Export File"
						<p.subtitle[mt: 1rem]> "Not sure how to export? See this tutorial {<a target='_blank' href="https://youtu.be/lpC7C9wJoTA "> "Video Tutorial: How to use notion2anki..."}."
						<p.subtitle[mt: 1rem]> "Nested toggle lists as multiple cards are not supported by notion2anki. Please convert the nested toggles to top level toggles before exporting your Notion page."
						<p.subtitle[mt: 1rem]> "Make sure you export your Notion page as {<strong> "HTML"}!"
						if errorMessage
							<.has-text-centered[m: 2rem]>
								<h1 .title .is-3> "Oh snap, just got an error 😢"
								<p .subtitle> "Please refresh and try again otherwise report this bug to the developer on Discord with a screenshot 📸"
								<.notification .is-danger innerHTML=errorMessage>
								<a.button target="_blank" href="https://discord.gg/PSKC3uS">
									<span.icon>
										<i.fab.fa-discord>
									<span> "Discord"
						else
							<div.field>
								<div.file.is-centered.is-boxed.is-success.has-name>
									<label.file-label>
										<input$selectorInput.file-input type="file" name="pkg" accept=".zip,.html,.md" required @change=fileSelected>
										<span$selectorBackground.file-cta[bg: gray]>
											<span.file-icon>
												<i.fas.fa-upload>
											<span$selectorLabel.file-label> "Click to Upload…"
										<span$selectorFileName.file-name> "My Notion Export.zip"
							<.has-text-centered>
								if downloadLink
									<a href=downloadLink @click=didDownload download=deckName> "Click to Download"
								elif state == 'ready'
									<button[mt: 2rem].button.cta .is-large .is-primary type="submit"> "Convert"
								else
									<button[mt: 2rem].button.cta .is-large .is-primary type="submit"> <i .fa .fa-spinner .fa-spin> ""
			<.section>
				<.container>
					<h3 .title .is-3> "Support this project"
					<hr>
					<p.subtitle> "This project is 100% free and will remain free but please if you have the means you can support this project via these options:"
					<.has-text-centered>
						<a href="https://patreon.com/alemayhu"> <img src="become_a_patron_button.png">
					<.has-text-centered>
						<a.button .is-large href="https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=WUARHGVHUZ5FL&source=ur">
							<span .icon .is-large> <i .fab .fa-paypal aria-hidden="true">
							<span> "Paypal"
					<div[mt: 2]>
						<iframe src="https://github.com/sponsors/alemayhu/card" title="Sponsor alemayhu" height="225" width="600" style="border: 0;">
					<h4 .title .is-4> "Other Ways to Contribute"
					<p.subtitle> 
						"If you know someone who can benefit from notion2anki, please share it with them. We want to save people time, anywhere in the world! "
						"If you are missing a feature or format, let me know on {<a href="https://github.com/alemayhu/notion2anki"> "GitHub"} or the {<a href="https://discord.gg/PSKC3uS" target="_blank"> "Discord"}."													
