const defaultPhone = () => {
    fetch(`https://openapi.programming-hero.com/api/phones?search=iphone`)
        .then(res => res.json())
        .then(data => displayPhone(data.data))
}
defaultPhone();
// defulte display phones 

document.getElementById('phone-name').addEventListener('keyup', function (event) {
    if (event.key === 'Enter') {
        searchPhone();
    }
})
// enter press funtion 

const searchPhone = () => {
    const phoneName = document.getElementById('phone-name');
    const phoneNameValue = phoneName.value;
    getInfo(phoneNameValue);

    // start loader 
    loader(true);
}
// get name from input filed 

const getInfo = (phoneName) => {
    fetch(`https://openapi.programming-hero.com/api/phones?search=${phoneName}`)
        .then(res => res.json())
        .then(data => displayPhone(data.data))
}
// get information form api 

const displayPhone = (phones) => {
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.innerHTML = '';
    phones = phones.slice(1, 10);
    // show 10 phones 

    const noFound = document.getElementById('no-found');
    if (phones.length === 0) {
        noFound.classList.remove('d-none');
        loader(false);
    }
    else {
        noFound.classList.add('d-none');
    }
    // no found conditon 

    phones.forEach(phone => {
        const { brand, phone_name, slug, image } = phone;
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card" title="Click details for more about">
            <img src="${image}" class="card-img-top w-75 mx-auto p-3" alt="...">
            <div class="card-body">
                <h5 class="card-title text-center">Brand: ${brand}</h5>
                <h5 class="card-title text-center">Name: ${phone_name}</h5>
                <div class="text-center">
                    <button onclick="detilsInfo('${slug}')" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    Details</button>
                </div>
            </div>
        </div> 
        `;
        phoneContainer.appendChild(div);

        // ends loader funtion called
        loader(false);
    })
}
// add phone items inside the section 

const detilsInfo = (id) => {
    fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
        .then(res => res.json())
        .then(data => phoneDetails(data.data))
}
// by id phone information 

const phoneDetails = (info) => {
    const {storage,displaySize,chipSet,sensors,} = info.mainFeatures;
    console.log(sensors);
    const modalTitle = document.getElementById('exampleModalLabel');
    const modalBody = document.getElementById('modal-body');
    modalTitle.innerText = info.name;
    modalBody.innerHTML = `
        <p>Display: ${displaySize}</p>
        <p>Storage: ${storage}</p>
        <p>Chipset: ${chipSet}</p>
        <ul id="sensors-list">

        </ul>
    `;
    const sensorList = document.getElementById('sensors-list');
    for(const sensor of sensors){
        const li = document.createElement('li');
        li.innerText = sensor;
        sensorList.appendChild(li);
    }
};
// phone details info function

const loader = isLoading => {
    const loader = document.getElementById('page-spinner');
    if (isLoading) {
        loader.classList.remove('d-none');
    }
    else {
        loader.classList.add('d-none');
    }
}
// page loader
