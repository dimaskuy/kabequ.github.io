const documentHTML = document.querySelector('html');
const changeThemeBtn = document.querySelector('.change-theme');
const changeThemeBtnOuter = document.querySelector('.change-theme.outer-nav');

// ToTop Btn
const toTopBtn = document.querySelector('.to-top');
document.addEventListener('scroll', function() {
  if (document.body.scrollTop > 40) {
    toTopBtn.classList.remove('none');
    changeThemeBtnOuter.classList.remove('none');
  } else {
    toTopBtn.classList.add('none');
    changeThemeBtnOuter.classList.add('none');
  }
});

toTopBtn.addEventListener('click', function() {
  document.body.scrollTop = 0;
});


changeThemeBtn.addEventListener('click', function(e) {
  e.preventDefault();
  if (documentHTML.dataset.theme === 'dark') {
    documentHTML.dataset.theme = 'light';
    e.target.innerHTML = 'Night Mode <i class="bi bi-moon-stars-fill ml-1"></i>';
    changeThemeBtnOuter.innerHTML = e.target.innerHTML;
  } else {
    documentHTML.dataset.theme = 'dark';
    e.target.innerHTML = 'Light Mode <i class="bi bi-cloud-sun-fill ml-1"></i>';
    changeThemeBtnOuter.innerHTML = e.target.innerHTML;
  }
});

changeThemeBtnOuter.addEventListener('click', function(e) {
  e.preventDefault();
  if (documentHTML.dataset.theme === 'dark') {
    documentHTML.dataset.theme = 'light';
    e.target.innerHTML = 'Night Mode <i class="bi bi-moon-stars-fill ml-1"></i>';
    changeThemeBtn.innerHTML = e.target.innerHTML;
  } else {
    documentHTML.dataset.theme = 'dark';
    e.target.innerHTML = 'Light Mode <i class="bi bi-cloud-sun-fill ml-1"></i>';
    changeThemeBtn.innerHTML = e.target.innerHTML;
  }
});



// Main Script
const mainInfo = document.querySelector('.main-info');
const totalWall = document.querySelector('.main-info .total-result i');
const cardRow = document.querySelector('.cards-wrap .row');
const cardBox = document.querySelector('.cards-wrap .row .card-columns');
const categoryLi = Array.from(document.querySelectorAll('.category-box ul li'));
const wallpaperDesc = document.querySelector('.main-info .title i');

mainInfo.innerHTML = loadingInfo();
cardBox.innerHTML = loadingCard();

fetch(`https://wallpaper-api-zhirrr.vercel.app/api/technology`)
  .then(response => response.json())
  .then(results => {
    const result = results.results;
    // wallpaperDesc.textContent = 'Technology';
    // totalWall.textContent = result.length;
    mainInfo.innerHTML = showMainInfo('Technology', result.length);
    cardWall = '';

    result.forEach((wallpaper, index) => {
      checkReadyImg(wallpaper, 'technology', index);
      cardWall += showWallpaper(wallpaper, 'technology', index);
    });
    cardBox.innerHTML = cardWall;
  })
  .catch(error => {
    cardRow.innerHTML = showError();
  });

categoryLi.forEach(category => {
  category.addEventListener('click', function(e) {
    categoryLi.forEach(checkCurrent => {
      if (checkCurrent.classList.contains('current')) {
        checkCurrent.classList.remove('current');
      }
      e.target.classList.add('current');
    });

    mainInfo.innerHTML = loadingInfo();
    cardBox.innerHTML = loadingCard();

    if (e.target.dataset.category === 'technology' && e.target.classList.contains('current')) {
      fetch(`https://wallpaper-api-zhirrr.vercel.app/api/technology`)
        .then(response => response.json())
        .then(results => {
          const result = results.results;
          // wallpaperDesc.textContent = e.target.textContent;
          // totalWall.textContent = result.length;
          mainInfo.innerHTML = showMainInfo(e.target.textContent, result.length);
          cardWall = '';

          result.forEach((wallpaper, index) => {
            checkReadyImg(wallpaper, 'technology', index);
            cardWall += showWallpaper(wallpaper, 'technology', index);
          });
          cardBox.innerHTML = cardWall;
        })
        .catch(error => {
          cardRow.innerHTML = showError();
        });
    }
    else if (e.target.dataset.category !== 'technology' && e.target.classList.contains('current')) {
      const thisDataset = e.target.dataset.category;
      fetch(`https://wallpaper-api-zhirrr.vercel.app/api/${thisDataset}`)
        .then(response => response.json())
        .then(results => {
          const result = results.results;
          // wallpaperDesc.textContent = e.target.textContent;
          // totalWall.textContent = result.length;
          mainInfo.innerHTML = showMainInfo(e.target.textContent, result.length);
          cardWall = '';

          result.forEach((wallpaper, index) => {
            checkReadyImg(wallpaper, 'technology', index);
            cardWall += showWallpaper(wallpaper, thisDataset, index);
          });
          cardBox.innerHTML = cardWall;
        })
        .catch(error => {
          cardRow.innerHTML = showError();
        });
    }
  });
});

document.addEventListener('click', function(e) {
  if (e.target.classList.contains('card-img-top')) {
    lightbox(e.target.src, e.target.alt);
  }
});

// FUNCTION
function showWallpaper(imageUrl, category, index) {
  return `
  <div class="col my-sm-2 my-1">
    <div class="card border-0" style="width: 18rem;">
      <img src="${imageUrl}" class="card-img-top img-fluid" alt="${category} wallpaper${index}" loading="lazy" data-toggle="modal" data-target="#showWallpaperImg">
      <div class="card-body px-0">
        <input type="text" value="${imageUrl}" class="mr-2 font-weight-bold btn url-box px-2 scroll-pink" readonly>
        <button type="button scale" class="btn btn-clipboard font-weight-bold mr-2" data-toggle="tooltip" title="Copy on clipboard"><i class="bi bi-clipboard scale"></i></button>
        <a href="${imageUrl}" class="btn btn-download scale font-weight-bold" data-toggle="tooltip" title="Download image" target="_blank" download><i class="bi bi-download"></i></a>
      </div>
    </div>
  </div>`;
}

function loadingInfo() {
  return `<div class="loading-title mb-2"></div>
  <div class="loading-result"></div>`;
}

function showMainInfo(title, total) {
  return `<h2 class="title font-weight-bold pb-2">Showing <i>${title}</i> wallpaper! <span class="title-line"></span></h2>
  <span class="total-result mt-2 btn">Total wallpapers: <i>${total}</i></span>`;
}

function loadingCard() {
  return `<div class="col loading-card mx-2 my-2">
    <div class="card border-0">
      <div class="card-img-top-loading"></div>
      <div class="card-body px-0">
        <span class="btn url-box-loading mr-2"></span>
        <span class="btn mr-2"></span>
        <span class="btn mr-2"></span>
      </div>
    </div>
  </div>`.repeat(6);
}

function showError() {
  return `<div class="error-msg-box text-center mt-sm-0 mt-3 mb-5" data-aos="fade-up">
    <img src="error-fetch.svg" alt="Error Image" class="error-img img-fluid">
    <h2 class="error-msg title font-weight-bold">Something went wrong</h2>
    <p class="error-desc text-muted">Please check your connection or try again later.</p>
  </div>`;
}

function checkReadyImg(imageUrl, category, index) {
  const imgLoadingDiv = document.createElement('div');
  imgLoadingDiv.classList.add('card-img-top-loading');

  const imgWallpaper = document.createElement('img');
  imgWallpaper.src = imageUrl;
  imgWallpaper.alt = `${category} wallpaper${index}`;
  imgWallpaper.classList.add('card-img-top');
  imgWallpaper.classList.add('img-fluid');

  if (document.readyState === 'loading' || document.readyState === 'interactive') {
    Array.from(document.querySelectorAll('.card')).forEach(img => {
      img.replaceChild(imgLoadingDiv, Array.from(document.querySelector('.card').children)[0]);
    });
  }
  else {
    Array.from(document.querySelectorAll('.card')).forEach(img => {
      img.replaceChild(imgWallpaper, Array.from(document.querySelector('.card').children)[0]);
    });
    // document.querySelector('.card').replaceChild(imgWallpaper, imgLoadingDiv);
  }
}

function lightbox(src, alt) {
  const modalImg = document.querySelector('.modal img');
  modalImg.src = src;
  modalImg.alt = alt;
  const modalImgDownload = document.querySelector('.modal .btn-download');
  modalImgDownload.href = src;
}

// Copy to Clipboard
document.addEventListener('click', function(e) {
  if (e.target.classList.contains('btn-clipboard')) {
    const wallpaperUrl = e.target.previousElementSibling;
    wallpaperUrl.select();
    document.execCommand('copy');
    // e.target.children.classList.replace('bi-clipboard', 'bi-check2');
    // setTimeout(function () {
    //   e.target.children.classList.replace('bi-check2', 'bi-clipboard');
    // }, 1500);

    sweetalertMsg('success', 'Copied to clipboard!', 1500);
  }
  else if (e.target.classList.contains('bi-clipboard')) {
    const wallpaperUrl = e.target.parentElement.previousElementSibling;
    wallpaperUrl.select();
    document.execCommand('copy');
    // e.target.classList.replace('bi-clipboard', 'bi-check2');
    // setTimeout(function () {
    //   e.target.children.classList.replace('bi-check2', 'bi-clipboard');
    // }, 1500);

    sweetalertMsg('success', 'Copied to clipboard!', 1500);
  }
});

function sweetalertMsg(info, text, time = 1500) {
  const Toast = Swal.mixin({
    toast: true,
    position: 'bottom-start',
    showConfirmButton: false,
    timer: time,
    timerProgressBar: false,
  });

  Toast.fire({
    icon: info,
    title: text,
  });
}




// if (document.readyState === 'loading' || document.readyState === 'interactive') {
//   mainInfo.innerHTML = loadingInfo();
//   cardBox.innerHTML = loadingCard();
//   document.addEventListener('DOMContentLoaded', ready);
// } else {
//   ready();
// }

// function showWallpaper(imageUrl, category, index) {
//   <div class="card-body">
//     <button type="button scale" class="btn btn-facebook font-weight-bold mr-2" data-toggle="tooltip" title="Share to Facebook"><i class="bi bi-facebook"></i></button>
//     <button type="button scale" class="btn btn-twitter font-weight-bold mr-2" data-toggle="tooltip" title="Share to Twitter"><i class="bi bi-twitter"></i></button>
//     <button type="button scale" class="btn btn-clipboard font-weight-bold mr-2" data-toggle="tooltip" title="Copy on clipboard"><i class="bi bi-clipboard scale"></i></button>
//     <a href="${imageUrl}" class="btn btn-download scale font-weight-bold" data-toggle="tooltip" title="Download image" target="_blank" download><i class="bi bi-download"></i></a>
//   </div>
// }

// function loadingCard() {
//   return `<div class="col loading-card mx-2 my-2">
//     <div class="card border-0">
//       <div class="card-img-top-loading"></div>
//       <div class="card-body">
//         <span class="btn mr-2"></span>
//         <span class="btn mr-2"></span>
//         <span class="btn mr-2"></span>
//         <span class="btn mr-2"></span>
//       </div>
//     </div>
//   </div>`.repeat(6);
// }
