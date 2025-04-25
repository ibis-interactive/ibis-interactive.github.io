$().ready(function() {

});

loadComponent('/views/components/ggj25/twitch.html', 'headerwrap');
loadComponent('/views/components/ggj25/youtube.html', 'youtube');

$.getJSON('/assets/ggj25-vods.json', function(data) {
    let vods = data.vods;

    vods.forEach(vod => {

        let vodHTML = `
            <div class="row align-items-center">
            <div class="col ps-5">
                <h1>${vod.title}</h1>
                <h2>${vod.speaker}</h2>
                <p>${vod.description}</p>
            </div>
            <div class="col">
                <iframe class="youtube" width="720" height="405" src="${vod.iframe.url}" title="${vod.iframe.title}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
            </div>
        </div>
        <br>
        `;

        $('#youtubeVODs').append(vodHTML);
    });
});