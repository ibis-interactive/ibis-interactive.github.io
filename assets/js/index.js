// Función para cargar un componente en un contenedor

// Cargar los componentes
loadComponent('/views/components/index/about.html', 'about');
loadComponent('/views/components/index/home.html', 'headerwrap');
loadComponent('/views/components/index/portfolio.html', 'portfolio');
loadComponent('/views/components/index/team.html', 'team');


$.getJSON('/assets/games.json', function (data) {
    const games = data.games;
    games.forEach(function (game) {
        const portfolioHtml = `
          <div class="col-12 col-md-6 mb-4">
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
                  <a href="${game.link}" class="btn btn-itchio">${game.playOn}</a>
                </div>
              </div>
            </div>
          </div>
        `;

        $("#gamesList").append(portfolioHtml);
    });
});

$.getJSON('/assets/team.json', function (data) {
    let teamMembers = data.teamMembers;
    teamMembers.forEach(member => {
        let links = '';
        member.links.forEach(link => {
            links += `<a href="${link.href}" aria-label="${link.label}"><i class="fa ${link.icon}"></i></a>`;
        });

        let roles = '';
        member.roles.forEach((role, idx) => {
            if (idx != 0) roles += " - "
            roles += `${role.name} <span class="${role.icon}"/>`;
        });


        let memberHTML = `
          <div class="col-lg-4 centered pad">
            <img class="img img-circle" src="${member.img}" height="120px" width="120px" alt="team member ${member.name}">
            <h4><strong>${member.name}</strong></h4>
            <h6>${roles}</h6>
            <p>${member.description}<br><strong>Juegos favoritos:</strong> ${member.favorites}</p>
            ${links}
          </div>
        `;
        $('#teamMembers').append(memberHTML);
    });
});
