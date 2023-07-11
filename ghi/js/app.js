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

window.addEventListener('DOMContentLoaded', async () => {
const url = 'http://localhost:8000/api/conferences/';
try {
    const response = await fetch(url);

    if (!response.ok) {
        // what to do if response is bad
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
                const convertedDate = convertedStartDate.substring(0,10) + ' - ' + convertedEndDate.substring(0, 10)
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
        // const conference = data.conferences[0];
        // const nameTag = document.querySelector('.card-title');
        // nameTag.innerHTML = conference.name;

        // const detailUrl = `http://localhost:8000${conference.href}`;
        // const detailResponse = await fetch(detailUrl);
    //     if (detailResponse.ok) {
    //     const details = await detailResponse.json();
    //     const detailTag = document.querySelector('.card-text');
    //     detailTag.innerHTML = details.conference.description;
    //     console.log(details)
    //     const imageTag = document.querySelector('.card-img-top');
    //     imageTag.src = details.conference.location.picture_url;
    //   }
    }
} catch (e) {
    // what to do if an error is raised
}
});
