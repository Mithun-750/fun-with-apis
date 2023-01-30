const ok = document.getElementById(`ok`);
const name = document.getElementById(`name`);

let x = function (event) {
    if (event.key === 'Enter' || event.type === 'click') {

        let hi = document.createElement(`div`)
        hi.setAttribute(`class`, `hi`)

        let greet = document.getElementById(`greet`);
        let yourname = name.value;

        if (yourname == ``) {
            alert(`Please enter your name`)
        } else {

            loading = document.createElement(`div`)
            loading.innerHTML = `<img src="https://media.tenor.com/On7kvXhzml4AAAAj/loading-gif.gif" alt="loading.." class="loading">`
            greet.insertAdjacentElement(`beforeend`, loading)


            let country = fetch(`https://api.nationalize.io/?name=${yourname}`)
            country.then((value) => {
                return value.json()
            }).then((value) => {

                const options = { method: 'GET', headers: { accept: 'application/json' } };

                let c_name = fetch(`https://api.openaq.org/v1/countries/${value.country[0].country_id}?limit=200&page=1&offset=0&sort=asc&order_by=country`, options)

                c_name.then((value) => {
                    return value.json()
                }).then((value) => {
                    con_nam = value.results[0].name
                    return con_nam
                }).then((value) => {

                    loading.remove()
                    name.value = ``;

                    hi.innerHTML = `<b>HI ${yourname} from ${value}</b> <button class="bye_btn">Bye</button>`

                    greet.insertAdjacentElement(`beforeend`, hi)

                    let bye = document.getElementsByClassName(`bye_btn`)
                    let bye_arr = Array.from(bye)
                    for (const el of bye_arr) {
                        el.onclick = () => {
                            let parentN = el.parentNode
                            parentN.remove()
                        }
                    }

                })
            }).catch((error) => {
                loading.remove()
                name.value = ``;

                hi.innerHTML = `<b>HI ${yourname} thats a unique name :)</b> <button class="bye_btn">Bye</button>`

                greet.insertAdjacentElement(`beforeend`, hi)

                let bye = document.getElementsByClassName(`bye_btn`)
                let bye_arr = Array.from(bye)
                for (const el of bye_arr) {
                    el.onclick = () => {
                        let parentN = el.parentNode
                        parentN.remove()
                    }
                }
            })

        }
    }
}
name.addEventListener('keydown', x);
ok.addEventListener('click', x);


const ok2 = document.getElementById(`ok2`);
const city = document.getElementById(`city`);

let y = function (event) {
    if (event.key === 'Enter' || event.type === 'click') {

        let hi = document.createElement(`div`)
        hi.setAttribute(`class`, `hi`)

        let data = document.getElementById(`data`);
        let yourcity = city.value;

        loading = document.createElement(`div`)
        loading.innerHTML = `<img src="https://media.tenor.com/On7kvXhzml4AAAAj/loading-gif.gif" alt="loading.." class="loading">`
        data.insertAdjacentElement(`beforeend`, loading)

        if (yourcity == ``) {
            alert(`Please enter a city name`)
        } else {



            const options2 = {
                method: 'GET',
                headers: {
                    'X-RapidAPI-Key': '1a89dc95ffmsh7ffc96e6cf1d634p164ca3jsn0f3c05102e70',
                    'X-RapidAPI-Host': 'air-quality-by-api-ninjas.p.rapidapi.com'
                }
            };

            let c_name = fetch(`https://air-quality-by-api-ninjas.p.rapidapi.com/v1/airquality?city=${yourcity}`, options2)
            c_name.then(response => response.json())
                .then((value) => {
                    console.log(value)
                    let co = value.CO.concentration
                    let no2 = value.NO2.concentration
                    let o3 = value.O3.concentration
                    let so2 = value.SO2.concentration

                    loading.remove()
                    city.value = ``;

                    hi.innerHTML = `
                <b>${yourcity} :</b> 
                <div>CO concentration : ${co} </div>
                <div>No2 concentration : ${no2} </div>
                <div>O3 concentration : ${o3} </div>
                <div>SO2 concentration : ${so2} </div>
                <button class="bye_btn">Done</button>
                `

                    data.insertAdjacentElement(`beforeend`, hi)

                    let bye = document.getElementsByClassName(`bye_btn`)
                    let bye_arr = Array.from(bye)
                    for (const el of bye_arr) {
                        el.onclick = () => {
                            let parentN = el.parentNode
                            parentN.remove()
                        }
                    }

                }).catch((error) => {
                    name.value = ``;

                    loading.remove()
                    hi.innerHTML = `<b>Data not found on ${yourcity}</b> <button class="bye_btn">Done</button>`

                    data.insertAdjacentElement(`beforeend`, hi)

                    let bye = document.getElementsByClassName(`bye_btn`)
                    let bye_arr = Array.from(bye)
                    for (const el of bye_arr) {
                        el.onclick = () => {
                            let parentN = el.parentNode
                            parentN.remove()
                        }
                    }
                })

        }
    }
}


city.addEventListener('keydown', y);
ok2.addEventListener('click', y);


