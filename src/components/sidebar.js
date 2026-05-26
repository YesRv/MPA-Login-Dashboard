export default function sidebar(username, role){
    const sidebarTemplate = `
      <div class="head">
        <div class="name-resturant">
          <div class="name-top">
            <img src="/src/assets/img/logo_4_sin_fondo.png">
            <h1>Kurohana</h1>
          </div>
          <span>Asian Restaurant</span>
        </div>
        <div class="profile">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12 10C14.2091 10 16 8.20914 16 6C16 3.79086 14.2091 2 12 2C9.79086 2 8 3.79086 8 6C8 8.20914 9.79086 10 12 10Z" fill="#ffffff"></path> <path d="M2.72778 5.81803C2.62732 5.41619 2.22012 5.17186 1.81828 5.27233C1.41643 5.37279 1.17211 5.77999 1.27257 6.18184L1.65454 7.7097C2.3593 10.5287 4.49604 12.7495 7.25018 13.5787L7.25018 18.0519C7.25015 18.9504 7.25012 19.6996 7.33009 20.2944C7.41449 20.9222 7.60016 21.489 8.05563 21.9445C8.5111 22.3999 9.0779 22.5856 9.7057 22.67C10.3005 22.75 11.0497 22.75 11.9482 22.7499H12.0522C12.9507 22.75 13.6999 22.75 14.2947 22.67C14.9225 22.5856 15.4892 22.3999 15.9447 21.9445C16.4002 21.489 16.5859 20.9222 16.6703 20.2944C16.7502 19.6996 16.7502 18.9504 16.7502 18.052L16.7502 13.859C17.7313 14.1514 18.4808 15.0039 18.6058 16.067L19.2553 21.5876C19.3037 21.9989 19.6764 22.2932 20.0878 22.2448C20.4992 22.1964 20.7934 21.8237 20.745 21.4123L20.0956 15.8918C19.8512 13.815 18.0912 12.2499 16.0002 12.2499H8.0847C5.64125 11.6764 3.71957 9.78517 3.10975 7.3459L2.72778 5.81803Z" fill="#ffffff"></path> </g></svg>
          <p>${username}</p>
        </div>
      </div>

      <div class="option">
        <div class="active">
          <svg fill="#ffffff" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" id="dashboard" class="icon glyph"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><rect x="2" y="2" width="9" height="11" rx="2"></rect><rect x="13" y="2" width="9" height="7" rx="2"></rect><rect x="2" y="15" width="9" height="7" rx="2"></rect><rect x="13" y="11" width="9" height="11" rx="2"></rect></g></svg>
          <span>Dashboard</span>
        </div>
        ${role === "admin" ?
            `
            <div>
                <svg fill="#ffffff" viewBox="0 0 36 36" version="1.1" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>administrator-solid</title> <circle cx="14.67" cy="8.3" r="6" class="clr-i-solid clr-i-solid-path-1"></circle><path d="M16.44,31.82a2.15,2.15,0,0,1-.38-2.55l.53-1-1.09-.33A2.14,2.14,0,0,1,14,25.84V23.79a2.16,2.16,0,0,1,1.53-2.07l1.09-.33-.52-1a2.17,2.17,0,0,1,.35-2.52,18.92,18.92,0,0,0-2.32-.16A15.58,15.58,0,0,0,2,23.07v7.75a1,1,0,0,0,1,1H16.44Z" class="clr-i-solid clr-i-solid-path-2"></path><path d="M33.7,23.46l-2-.6a6.73,6.73,0,0,0-.58-1.42l1-1.86a.35.35,0,0,0-.07-.43l-1.45-1.46a.38.38,0,0,0-.43-.07l-1.85,1a7.74,7.74,0,0,0-1.43-.6l-.61-2a.38.38,0,0,0-.36-.25H23.84a.38.38,0,0,0-.35.26l-.6,2a6.85,6.85,0,0,0-1.45.61l-1.81-1a.38.38,0,0,0-.44.06l-1.47,1.44a.37.37,0,0,0-.07.44l1,1.82A7.24,7.24,0,0,0,18,22.83l-2,.61a.36.36,0,0,0-.26.35v2.05a.36.36,0,0,0,.26.35l2,.61a7.29,7.29,0,0,0,.6,1.41l-1,1.9a.37.37,0,0,0,.07.44L19.16,32a.38.38,0,0,0,.44.06l1.87-1a7.09,7.09,0,0,0,1.4.57l.6,2.05a.38.38,0,0,0,.36.26h2.05a.38.38,0,0,0,.35-.26l.6-2.05a6.68,6.68,0,0,0,1.38-.57l1.89,1a.38.38,0,0,0,.44-.06L32,30.55a.38.38,0,0,0,.06-.44l-1-1.88a6.92,6.92,0,0,0,.57-1.38l2-.61a.39.39,0,0,0,.27-.35V23.82A.4.4,0,0,0,33.7,23.46Zm-8.83,4.72a3.34,3.34,0,1,1,3.33-3.34A3.34,3.34,0,0,1,24.87,28.18Z" class="clr-i-solid clr-i-solid-path-3"></path> <rect x="0" y="0" width="36" height="36" fill-opacity="0"></rect> </g></svg>
                <span>Administrator</span>
            </div>

            `
            : ""
        }
        <div>
          <svg fill="#ffffff" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8 8a2 2 0 0 0 2.828 0l7.172-7.172a2 2 0 0 0 0-2.828l-8-8zM7 9a2 2 0 1 1 .001-4.001A2 2 0 0 1 7 9z"></path></g></svg>
          <span>Order</span>
        </div>
        <div>
          <svg fill="#ffffff" viewBox="0 0 32 32" enable-background="new 0 0 32 32" version="1.1" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="play"></g> <g id="stop"></g> <g id="pause"></g> <g id="replay"></g> <g id="next"></g> <g id="Layer_8"></g> <g id="search"></g> <g id="list"></g> <g id="love"> <g> <path d="M27.615,5.598c-3.206-3.208-8.404-3.211-11.612-0.006c-3.205-3.208-8.405-3.21-11.611-0.005 C1.183,8.791,1.18,13.99,4.385,17.198l11.607,11.618l11.616-11.606C30.817,14.005,30.82,8.806,27.615,5.598z"></path> <path d="M15.991,30.23L3.678,17.905c-1.739-1.741-2.696-4.055-2.695-6.515c0.002-2.46,0.962-4.772,2.702-6.511 c1.738-1.737,4.05-2.694,6.509-2.694c2.143,0,4.173,0.726,5.811,2.062c1.636-1.332,3.663-2.056,5.802-2.056 c2.462,0,4.776,0.959,6.517,2.701c1.739,1.741,2.696,4.054,2.695,6.515c-0.002,2.46-0.962,4.773-2.702,6.512L15.991,30.23z M10.193,4.185c-1.925,0-3.734,0.749-5.095,2.109c-1.363,1.362-2.114,3.172-2.116,5.098c-0.001,1.926,0.748,3.737,2.109,5.1 l10.901,10.91l10.908-10.9c1.363-1.361,2.114-3.171,2.116-5.098c0.001-1.926-0.748-3.737-2.109-5.1 c-1.363-1.363-3.175-2.114-5.103-2.114c-1.925,0-3.734,0.749-5.096,2.109l-0.708,0.707l-0.706-0.707 C13.934,4.936,12.121,4.185,10.193,4.185z"></path> </g> </g> <g id="menu"></g> <g id="add"></g> <g id="headset"></g> <g id="random"></g> <g id="music"></g> <g id="setting"></g> <g id="Layer_17"></g> <g id="Layer_18"></g> <g id="Layer_19"></g> <g id="Layer_20"></g> <g id="Layer_21"></g> <g id="Layer_22"></g> <g id="Layer_23"></g> <g id="Layer_24"></g> <g id="Layer_25"></g> <g id="Layer_26"></g> </g></svg>
          <span>Favorite</span>
        </div>

        ${role === "admin" ?
            `
            <div>
                <svg fill="#ffffff" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M21 5H3a1 1 0 0 0-1 1v4h.893c.996 0 1.92.681 2.08 1.664A2.001 2.001 0 0 1 3 14H2v4a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1v-4h-1a2.001 2.001 0 0 1-1.973-2.336c.16-.983 1.084-1.664 2.08-1.664H22V6a1 1 0 0 0-1-1zM11 17H9v-2h2v2zm0-4H9v-2h2v2zm0-4H9V7h2v2z"></path></g></svg>
                <span>Coupon</span>
            </div>

            `
            : ""
        }

        <div>
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M20.1 9.2214C18.29 9.2214 17.55 7.9414 18.45 6.3714C18.97 5.4614 18.66 4.3014 17.75 3.7814L16.02 2.7914C15.23 2.3214 14.21 2.6014 13.74 3.3914L13.63 3.5814C12.73 5.1514 11.25 5.1514 10.34 3.5814L10.23 3.3914C9.78 2.6014 8.76 2.3214 7.97 2.7914L6.24 3.7814C5.33 4.3014 5.02 5.4714 5.54 6.3814C6.45 7.9414 5.71 9.2214 3.9 9.2214C2.86 9.2214 2 10.0714 2 11.1214V12.8814C2 13.9214 2.85 14.7814 3.9 14.7814C5.71 14.7814 6.45 16.0614 5.54 17.6314C5.02 18.5414 5.33 19.7014 6.24 20.2214L7.97 21.2114C8.76 21.6814 9.78 21.4014 10.25 20.6114L10.36 20.4214C11.26 18.8514 12.74 18.8514 13.65 20.4214L13.76 20.6114C14.23 21.4014 15.25 21.6814 16.04 21.2114L17.77 20.2214C18.68 19.7014 18.99 18.5314 18.47 17.6314C17.56 16.0614 18.3 14.7814 20.11 14.7814C21.15 14.7814 22.01 13.9314 22.01 12.8814V11.1214C22 10.0814 21.15 9.2214 20.1 9.2214ZM12 15.2514C10.21 15.2514 8.75 13.7914 8.75 12.0014C8.75 10.2114 10.21 8.7514 12 8.7514C13.79 8.7514 15.25 10.2114 15.25 12.0014C15.25 13.7914 13.79 15.2514 12 15.2514Z" fill="#ffffff"></path> </g></svg>
          <span>Settings</span>
        </div>
        
        <div class="exit">
          <button id="exit-btn"><i class="bx bx-log-out"></i>  Exit</button>
        </div>
      </div>
    `

    return sidebarTemplate

}