const form = document.querySelector(".Form");
const output = document.querySelector(".Output");

let trainList = [];
let cars;
const frontWeight = 210;
const backWeight = 30;
const maxWeight = 12500;

const TrainRegex = /^[1-9]\d*$/;

const main = () => {

  output.innerHTML = '';

  trainList = [];

  for (let i = 0; i < cars;) {
    trainList.push(Math.floor(Math.random() * (143 - 5 + 1)) + 5);
    i++;
  }

  trainList.unshift(frontWeight);
  trainList.push(backWeight);

  let trainWeight = trainList.reduce((acc, curr) => acc + curr, 0);

  const h2_1 = document.createElement("h2");
  h2_1.classList.add("Output__h2");
  h2_1.textContent = `your train weighs ${trainWeight} tons`;
  output.appendChild(h2_1);

  const h2_2 = document.createElement("h2");
  h2_2.classList.add("Output__h2");
  if (trainWeight < maxWeight) {
    h2_2.textContent = `Your train is ${Math.abs(trainWeight - maxWeight)} tons underweight`;
  } else {
    h2_2.textContent = `Your train is ${Math.abs(trainWeight - maxWeight)} tons overweight`;
  }
  output.appendChild(h2_2);

  const h2_3 = document.createElement("h2");
  h2_3.classList.add("Output__h2");
  h2_3.textContent = `your train has ${cars + 2} cars`;
  output.appendChild(h2_3);

  if (trainWeight < maxWeight){

    const ul = document.createElement("ul");

    trainList.forEach((item, index) => {

      const li = document.createElement("li");
      const img = document.createElement("img");
      const wrapper = document.createElement("div");

      if (index == 0) {
        li.textContent = `${item} - Engine`;
        img.src = "Images/Front.png";
      } else if (index == trainList.length - 1) {
        li.textContent = `${item} - Caboose`;
        img.src = "Images/Back.png";
      } else {
        if (item < 46) {
          li.textContent = `${item} - light`;
          img.src = "Images/blue.png";
        } else if (item < 97){
          li.textContent = `${item} - medium`;
          img.src = "Images/green.png";
        } else {
          li.textContent = `${item} - heavy`;
          img.src = "Images/red.png";
        }
    }

    wrapper.appendChild(img);
    img.classList.add("Output__wrapper__img");
    wrapper.appendChild(li);
    li.classList.add("Output__wrapper__li");
    ul.appendChild(wrapper);
    wrapper.classList.add("Output__wrapper");

  });

  output.appendChild(ul);
  ul.classList.add("Output__ul");

  } else {

    let removeAmount = 0;
    do {
      trainList.splice(trainList.length - 2, 1);
      removeAmount++;
    } while (trainList.reduce((acc, curr) => acc + curr, 0) > maxWeight);

    const h2_4 = document.createElement("h2");
    h2_4.textContent = `You need to remove the last ${removeAmount} cars`;
    output.appendChild(h2_4);

    const ul = document.createElement("ul");
    trainList.forEach((item, index) => {
      const li = document.createElement("li");
      const img = document.createElement("img");
      const wrapper = document.createElement("div");

      if (index == 0) {
        li.textContent = `${item} - Engine`;
        img.src = "Images/Front.png";
      } else if (index == trainList.length - 1) {
        li.textContent = `${item} - Caboose`;
        img.src = "Images/Back.png";
      } else if (index == trainList.length - removeAmount - 2) {
        li.textContent = `--Remove--`;
        img.src = "Images/X.png";
      } else {
        if (item < 46) {
          li.textContent = `${item} - light`;
          img.src = "Images/blue.png";
        } else if (item < 97){
          li.textContent = `${item} - medium`;
          img.src = "Images/green.png";
        } else {
          li.textContent = `${item} - heavy`;
          img.src = "Images/red.png";
        }
      }

      wrapper.appendChild(img);
      img.classList.add("Output__wrapper__img");
      wrapper.appendChild(li);
      li.classList.add("Output__wrapper__li");
      ul.appendChild(wrapper);
      wrapper.classList.add("Output__wrapper");

    });

    output.appendChild(ul);
    ul.classList.add("Output__ul");

  }

}

form.Train.addEventListener ('keyup', e => {

  if(form.Train.value == ''){
    form.Train.style.backgroundColor = "";
  } else if (TrainRegex.test(e.target.value)) {
    form.Train.style.backgroundColor = "lightgreen";
  } else {
    form.Train.style.backgroundColor = "lightcoral";
  }

});

form.addEventListener("submit", e => {

  e.preventDefault();

  if(TrainRegex.test(form.Train.value)){
    form.Train.style.backgroundColor = "";
    cars = form.Train.value;
    cars = +cars;
    form.Train.value = '';
    main();
  } else {
    alert("Try Again");
  }

});
