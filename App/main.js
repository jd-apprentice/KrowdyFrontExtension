const getInfo = document.querySelector(".getInfo");

getInfo.addEventListener("click", async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  if (tab !== null) {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: scrapingProfile,
    });
  }
});

let profile = {};

const scrapingProfile = async () => {
    const selectorProfile = {
        name: '.text-heading-xlarge',
        pais: 'div.mt2>div.pb2>span.text-body-small',
        cargo: 'div.pv-entity__summary-info.pv-entity__summary-info--background-section.mb2 > h3',
        showContactInfo: 'div.ph5 > div.mt2.relative > div.pb2.pv-text-details__left-panel > span.pv-text-details__separator.t-black--light > a',
        experienceName: 'div.pv-entity__summary-info.pv-entity__summary-info--background-section.mb2 > h3',
        experienceCompany: 'div.pv-entity__summary-info.pv-entity__summary-info--background-section.mb2 > p.pv-entity__secondary-title.t-14.t-black.t-normal',
        experienceType: 'div.pv-entity__summary-info.pv-entity__summary-info--background-section.mb2 > p.pv-entity__secondary-title.t-14.t-black.t-normal > span'
    }

    const wait = (milliseconds)=>{
        return new Promise(function(resolve){
            setTimeout(function() {
                resolve();
            }, milliseconds);
        });
    };

    const autoscrollToElement = async function(cssSelector){
      let exists = document.querySelector(cssSelector);
      while(exists){
          //
          let maxScrollTop = document.body.clientHeight - window.innerHeight;
          let elementScrollTop = document.querySelector(cssSelector).offsetHeight
          let currentScrollTop = window.scrollY
  
  
          if(maxScrollTop == currentScrollTop || elementScrollTop <= currentScrollTop)
              break;
  
          await wait(0.03)
  
          let newScrollTop = Math.min(currentScrollTop + 20, maxScrollTop);
          window.scrollTo(0,newScrollTop)
      }
  
      return new Promise(function(resolve){
          resolve();
      });
  };

    const getInfo = async () => {
        let profileExperience = {}
        const {name, pais, experienceName, experienceCompany, experienceType} = selectorProfile
        const nameProfile = document.querySelector(name)
        const paisProfile = document.querySelector(pais)
        const expNameProfile = document.querySelector(experienceName)
        const expCompanyProfile = document.querySelector(experienceCompany)
        const expTypeProfile = document.querySelector(experienceType)

        // Profile
        profileExperience.experienceName = expNameProfile.innerText
        profileExperience.experienceCompany = expCompanyProfile.innerText
        profileExperience.experienceType = expTypeProfile.innerText
        profile.name = nameProfile.innerText
        profile.pais = paisProfile.innerText
        profile.experience = profileExperience

    }

    await autoscrollToElement('body')
    await getInfo()
    console.log(profile)
}
