function createCard(name, description, pictureUrl, convertedDate, locationName) {
    return `
      <div class="card shadow p-3 mb-5 bg-white rounded">
        <img src="${pictureUrl}" class="card-img-top">
        <div class="card-body">
          <h5 class="card-title">${name}</h5>
          <h6 class="card-subtitle mb-2 text-muted">${locationName}</h6>
          <p class="card-text">${description}</p>
        </div>
        <div class="card-footer text-muted">
        ${convertedDate}
        </div>
      </div>
    `;
  }

function createError(name){
    return `
    <div class="alert alert-primary d-flex align-items-center" role="alert">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-exclamation-triangle-fill flex-shrink-0 me-2" viewBox="0 0 16 16" role="img" aria-label="Warning:">
            <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
        </svg>
        <div>
            ${name}
        </div>
    </div>
    `;
}

window.addEventListener('DOMContentLoaded', async () => {
const url = 'http://localhost:8000/api/conferences/';
try {
    const response = await fetch(url);

    if (!response.ok) {
        // what to do if response is bad
        throw 'Bad response from server';
    } else {
        const data = await response.json();
        let col = -1
        for (let conference of data.conferences){
            const detailUrl = `http://localhost:8000${conference.href}`;
            const detailResponse = await fetch(detailUrl);
            if (detailResponse.ok) {
                col += 1;
                const details = await detailResponse.json();
                const title = details.conference.name;
                const description = details.conference.description;
                const pictureUrl = details.conference.location.picture_url;
                const convertedStartDate = details.conference.starts;
                const convertedEndDate = details.conference.ends;
                const convertedDate = Date(convertedStartDate).substring(4, 15) + ' - ' + Date(convertedEndDate).substring(4, 15)
                const locationName = details.conference.location.name;
                const html = createCard(title, description, pictureUrl, convertedDate, locationName);
                const column = document.querySelectorAll('.col');
                if (col === 3){
                    col = 0;
                };
                column[col].innerHTML += html;
                console.log(html);
            }
        }
    }
} catch (e) {
    // what to do if an error is raised
        const notOk = e;
        const html = createError(notOk);
        const column = document.querySelector('.col');
        column.innerHTML += html;
}
});
