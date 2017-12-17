import React from 'react';

export default (props)=>{
	let { emote, onSelectEmote = ()=>{} } = props;
	return (
		<div className="emote-image-wrapper">
			<img className="emote-image"
				onClick={e=>onSelectEmote(emote.id)}
				src={getEmoteImg(emote.id)} 
				alt={emote.code}
				title={emote.code}
			/>
		</div>
	)
}


function getEmoteImg(id){
	return `https://static-cdn.jtvnw.net/emoticons/v1/${id}/1.0`
}