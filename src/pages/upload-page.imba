import '../components/locally-stored-checkbox'
import '../components/n2a-button'
import '../components/download-modal'
import '../components/n2a-side-bar'
import '../components/n2a-upload-form'
import '../components/centered-title'

import '../views/card-options'

import {iget, iset, viewparam} from '../data/storage'
import {getCardTypes} from '../data/card-types'
					
tag upload-page

	prop edd = 'empty-deck-desc'
	prop fontSize = 20
	
	prop view = 'upload'

	def clickSideBar item		
		const path = "/upload?view={item}"
		view = item
		window.history.pushState({"view":item}, document.title, path)


	def setup
		# Make sure we get default value
		if not iget('default_set')
			const cardTypes = getCardTypes!
			for ct of cardTypes 
				iset(ct.type, ct.default)
			iset('default_set', true)
		view = viewparam() || 'upload'

	def render
		<self[d: block py: 4rem]>
			<.section>
				<.columns>
					<.column>
						<n2a-side-bar[p: 2rem]>
					<.column .is-half>
						switch view
							when 'upload'
								<n2a-upload-form>
							when 'deck-options'											
								<centered-title title="Deck Options">
								<.box>
									<.field> 
										<label.label> "Deck Description"
										<locally-stored-checkbox label="Empty description" key='empty-description'>
									<.field>
										<label.label> "Deck Name"
										<.control>
											<input$input.input[fw: bold c: #83C9F5 @placeholder: grey] placeholder="Enter deck name (optional)" value=iget('deckName') type="text" @change.{iset('deckName', $input.value)}>
							when 'card-options'
								<card-options>
							when 'template'
								<centered-title title="Template Options">
								<.field .box>
									<label.label> "Template"
									<.control[mt: 1rem].control>
										<.select .is-large>
											<select$template name="template">
												<option value="specialstyle"> "Default"
												<option value="notionstyle"> "Only Notion"
												<option value="nostyle"> "Raw Note (no style)"
								# TODO: store font size in local storage
								<.field .box>
									<label.label> "Font Size" 
									<.control[d: grid jc: start]>
										<div[bd: 1px solid lightgray br: 5px p: 0]>
											<input bind=fontSize name='font-size' hidden>								
											<p> for fontPreset in [32, 26, 20, 12, 10]
													<span[fs: {fontPreset}px p: 3px br: 5px m: 0 8px] [c: #00d1b2]=(fontPreset == fontSize) @click.{fontSize = fontPreset}> "Aa"

								<h2> "TODO: show preview"

						<hr>
						<.has-text-centered>
							<h2.subtitle.is-2> "If you ever get stuck watch the videos below"						
							<p> "If you are busy, watch them in 2x speed and please SMASH the ♥️ LIKE button"
							<iframe width="560" height="315" src="https://www.youtube.com/embed/NLUfAWA2LJI" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>						
							<iframe width="560" height="315" src="https://www.youtube.com/embed/BN5DTq2tbsY" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>							
							<iframe width="560" height="315" src="https://www.youtube.com/embed/4PdhlNbBqXo" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>							
					<.column>
						<div[bg: purple1 p: 2rem bd: 2.3px solid purple7 bs: inset]> "Join me live on 💜 Twitch every week! {<a[m: 2rem bdb: 3px solid #a970ff] target="_blank" href="https://www.twitch.tv/alemayhu"> "https://www.twitch.tv/alemayhu"}"