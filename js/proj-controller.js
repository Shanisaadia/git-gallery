'use strict'

function initPage() {
    renderProj();
}

function renderProj() {
    const projs = getProjsForDisplay();
    // renderModal(projs)
    const strHTML = projs.map(function (proj) {
        return `
            <div class="col-md-4 col-sm-6 portfolio-item ${proj.id}">
            <a class="portfolio-link" data-toggle="modal" onclick="renderModal('${proj.id}')" href="#portfolioModal1">
            <div class="portfolio-hover">
            <div class="portfolio-hover-content">
            <i class="fa fa-plus fa-3x"></i>
            </div>
            </div>
            <img class="img-fluid img-portfolio" src="img/portfolio/${proj.id}-thumbnail.jpg" alt="">
            </a>
            <div class="portfolio-caption">
            <h4>${proj.name}</h4>
            <p class="text-muted">${proj.title}</p>
            </div>`
    })
    $('.proj-container').html(strHTML);
}

function renderModal(projId) {
    var proj = getProjById(projId);
    console.log(('This is proj from getProjById:', proj));
    var date = new Date(proj.publishedAt).toLocaleDateString()

    const strHTML = `
            <!-- Project Details Go Here -->
            <h2>${proj.name}</h2>
            <p class="item-intro text-muted">${proj.title}</p>
            <img class="img-fluid d-block mx-auto" src="img/portfolio/${proj.id}-full.jpg" alt="">
            <p>${proj.desc}</p>
            <ul class="list-inline">
              <li>Date: ${date}</li>
              <li>Client: Threads</li>
              <li>Category: ${proj.labels[0] + ', ' + proj.labels[1]}</li>
            </ul>

            <div class="buttons">
            <button class="btn btn-primary link" type="button">
            <a target="_blank" href="./projs/${proj.id}/index.html">Check it out!</a>
            </button>

            <button class="btn btn-primary" data-dismiss="modal" type="button">
                <i class="fa fa-times"></i>
                Close Project</button>
            </div>   
          </div>
          `

    $('.modal-body').html(strHTML);
}

function onSubmit() {
    var elEmail = document.querySelector('.email input').value;
    var elSubject = document.querySelector('.subject input').value;
    var elBody = document.querySelector('textarea').value;
    var strEmail = `https://mail.google.com/mail/?view=cm&fs=1&to=shanisaadia@google.com&su=${elSubject}&body=${elBody}%0D%0A${elEmail}`;
    window.open(strEmail);
}

