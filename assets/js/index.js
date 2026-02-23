// Función para cargar un componente en un contenedor

// Cargar los componentes
loadComponent('/views/components/index/about.html', 'about');
loadComponent('/views/components/index/main-game.html', 'main-game');
loadComponent('/views/components/index/home.html', 'headerwrap');
loadComponent('/views/components/index/portfolio.html', 'portfolio');
loadComponent('/views/components/index/services.html', 'services');
loadComponent('/views/components/index/team.html', 'team');

function getLang() {
    return document.documentElement.lang || 'es';
}

let reloadTimer = null;

function loadGamesAndTeam(lang) {
    const gamesFile = `/assets/games.${lang}.json`;
    const teamFile = `/assets/team.${lang}.json`;

    // Clear existing content to avoid duplicates
    $('#gamesList').empty();
    $('#teamMembers').empty();

    $.getJSON(gamesFile, function (data) {
        const games = data.games || [];
        const gridSize = games.length <= 4 ? 'col-md-6' : 'col-md-4';
        games.forEach(function (game) {
          const linkButtons = (Array.isArray(game.link) ? game.link : []).map(linkInfo => {
              return `<a href="${linkInfo.url}" class="btn btn-stores"><i class="${linkInfo.icon}"></i> ${game.playOn} ${linkInfo.store}</a>`;
          }).join(' ');

          const portfolioHtml = `
          <div class="col-12 ${gridSize} mb-4">
            <div class="grid">
              <div class="portfolio-card">
                <img class="img-responsive" src="${game.imgSrc}" alt="${game.altText}">
                <div data-bs-toggle="modal" data-bs-target="#${game.modalId}" class="btn btn-default">${game.title}</div>
              </div>
            </div>
          </div>

          <div class="modal fade" id="${game.modalId}" tabindex="-1" aria-hidden="true" aria-labelledby="${game.modalId}">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h4 class="modal-title">${game.title}</h4>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body centered">
                  <p><img class="img-responsive portfolio-card" src="${game.imgSrc}" alt="${game.altText}"></p>
                  <p class="modal-text">${game.description}</p>
                  ${linkButtons}
                </div>
              </div>
            </div>
          </div>
        `;

            $("#gamesList").append(portfolioHtml);
        });
    }).fail(function () {
        console.warn('Could not load', gamesFile);
    });

    $.getJSON(teamFile, function (data) {
        let teamMembers = data.teamMembers || [];
        teamMembers.forEach(member => {
            let links = '';
            (member.links || []).forEach(link => {
                links += `<a href="${link.href}" aria-label="${link.label}"><i class="fa ${link.icon}"></i></a>`;
            });

            let roles = '';
            (member.roles || []).forEach((role, idx) => {
                if (idx != 0) roles += " - "
                roles += `${role.name} <span class="${role.icon}"/>`;
            });


            let memberHTML = `
          <div class="col-lg-4 centered pad">
            <img class="img img-circle" src="${member.img}" height="120px" width="120px" alt="team member ${member.name}">
            <h4><strong>${member.name}</strong></h4>
            <h6>${roles}</h6>
            <p>${member.description}<br><strong>Favorite games:</strong> ${member.favorites}</p>
            ${links}
          </div>
        `;
            $('#teamMembers').append(memberHTML);
        });
    }).fail(function () {
        console.warn('Could not load', teamFile);
    });
}

// Initial load
loadGamesAndTeam(getLang());

// Watch for changes to <html lang="..."> and reload data when it changes
const observer = new MutationObserver(function (mutationsList) {
    for (const mutation of mutationsList) {
        if (mutation.type === 'attributes' && mutation.attributeName === 'lang') {
            const newLang = getLang();
            clearTimeout(reloadTimer);
            reloadTimer = setTimeout(() => loadGamesAndTeam(newLang), 100);
        }
    }
});
observer.observe(document.documentElement, { attributes: true });

// Also listen for common custom events used by i18n libraries
['languageChanged', 'i18nChanged', 'i18n:languageChanged'].forEach(evt => {
    window.addEventListener(evt, function () {
        clearTimeout(reloadTimer);
        reloadTimer = setTimeout(() => loadGamesAndTeam(getLang()), 100);
    });
});
