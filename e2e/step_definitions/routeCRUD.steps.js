/**
 * Methods can be found in
 * https://pptr.dev/#?product=Puppeteer&version=v2.1.1&show=api-class-page
 * https://github.com/smooth-code/jest-puppeteer/tree/master/packages/expect-puppeteer#toFill
 * https://github.com/puppeteer/puppeteer/blob/master/docs/api.md#pageselector
 */

const expect = require('expect-puppeteer');
const puppeteer = require('puppeteer');
const { defineFeature, loadFeature } = require('jest-cucumber');
const feature1 = loadFeature('./e2e/features/routeCRUD/createRoute.feature');
const feature2 = loadFeature('./e2e/features/routeCRUD/viewRoute.feature');
const feature3 = loadFeature('./e2e/features/routeCRUD/updateRoute.feature');
const feature4 = loadFeature('./e2e/features/routeCRUD/deleteRoute.feature');

let port = 3000;
let url = 'http://localhost:' + port;
let webId = "https://viadees2atester2.inrupt.net/profile/card#me";
let username = "viadeES2Atester2";
let password = "viadeES2A_password_2";

var page;

function delay(time) {
    return new Promise(function (resolve) {
        setTimeout(resolve, time);
    });
}

/**
 * First, the user logs in. Then all the test run.
 * These beforeAll statement deletes all routes in the pod,
 * so the test could execute the same way all times.
 */
beforeAll(async () => {
    //Open browser
    const browser = await puppeteer.launch({
        //headless let watch the chrome window interacting with the application
        headless: false,
        defaultViewport: null
    });
    page = await browser.newPage();

    //Borrar cookies
    await page.goto('chrome://settings/clearBrowserData');
    await page.keyboard.down('Enter');

    await delay(5000);
    
    await page.goto(url);

    /** ######################################################################################
     *  ################# Log in #############################################################
     *  ######################################################################################
     */

    //Wait for login button
    await page.waitForSelector('button[data-testid="provider-form-button"]');
    //Check if already logged
    const logueate = await expect(page).toMatchElement('button[data-testid="provider-form-button"]');
    //If not already logged
    if (logueate !== null) {
        //Fill webId
        await expect(page).toFill('input[name="idp"]', webId);
        await page.click('[type="submit"]');

        //Wait for user-pass screen
        await page.waitForSelector('input[name="username"]');
        //Fill user and pass
        await expect(page).toFill('input[name="username"]', username);
        await expect(page).toFill('input[name="password"]', password);
        await page.click('[id="login"]');

        //Wait for the main nav-bar icon
        await page.waitForSelector('img[src="img/bars-nav.svg"]');
    } else {
        //Wait for the main nav-bar icon
        await page.waitForSelector('img[src="img/bars-nav.svg"]');
    }

    /** ######################################################################################
     *  ################# Delete existing routes if needed ###################################
     *  ######################################################################################
     */
    /*
    let isThereAnyRoute = true;
    //Mientras haya rutas
    while (isThereAnyRoute) {

        //Go to my-routes
        await page.goto("http://localhost:" + port + "/#/my-routes");

        try {

            //Mientras haya rutas se borran

            //Click on the route
            await page.waitForSelector('div[className="rwrapper"]');
            await page.click('div[className="rwrapper"]');

            //Click on details
            await page.waitForSelector('button[name="route-details"]');
            await page.click('button[name="route-details"]');

            //Remove the route
            await page.waitForSelector('button[name="delete-route-button"]');
            await page.click('button[name="delete-route-button"]');

            //Click on confirm
            await page.waitForSelector('button[data-testid="acceptButton"]');
            await page.click('button[data-testid="acceptButton"]');

            //wait for page to reload
            await delay(5000);
        } catch (error) {
            //Cuando no haya, se sale del bucle
            isThereAnyRoute = false;
        }
    }
    */

});

//Add route
defineFeature(feature1, test1 => {

    test1('Pedro wants to create a new route', ({ given, when, then }) => {

        given('Pedro has a logged in successfully into the application', () => {
            //Already done in beforeAll() statement
        });

        when('Pedro creates a route with some points, name and description but without multimedia', async () => { //Las funciones en las que se use await deben ser asíncronas

            //Go to my-routes
            await page.goto("http://localhost:" + port + "/#/my-routes");

            //Click on add-route button
            await page.waitForSelector('button[name="create-route-floating-button"]');
            await page.click('button[name="create-route-floating-button"]');

            await delay(3000);

            //Fill fields
            await page.waitForSelector('input[class="value-name"]');
            await expect(page).toFill('input[class="value-name"]', "Ruta Cucumber-Puppeteer");
            
            await page.waitForSelector('textarea[class="value-description"]');
            await expect(page).toFill('textarea[class="value-description"]', "Descripción de la ruta Cucumber-Puppeteer");

            // 4 standar points
            await page.mouse.move(300, 300);
            await page.mouse.down({ button: 'left' });
            await page.mouse.up({ button: 'left' });
            await delay(300);

            await page.mouse.move(330, 310);
            await page.mouse.down({ button: 'left' });
            await page.mouse.up({ button: 'left' });
            await delay(300);

            await page.mouse.move(360, 300);
            await page.mouse.down({ button: 'left' });
            await page.mouse.up({ button: 'left' });
            await delay(300);

            await page.mouse.move(390, 310);
            await page.mouse.down({ button: 'left' });
            await page.mouse.up({ button: 'left' });
            await delay(300);

            await page.mouse.move(420, 300);
            await page.mouse.down({ button: 'left' });
            await page.mouse.up({ button: 'left' });
            await delay(300);


            // 4 waypoints
            await page.click('button[name="addWaypointButton"]');
            await page.mouse.move(300, 350);
            await page.mouse.down({ button: 'left' });
            await page.mouse.up({ button: 'left' });
            //Wait for modal to close...
            await delay(2500);

            await page.click('button[name="addWaypointButton"]');
            await page.mouse.move(330, 360);
            await page.mouse.down({ button: 'left' });
            await page.mouse.up({ button: 'left' });
            await delay(2500);

            await page.click('button[name="addWaypointButton"]');
            await page.mouse.move(360, 350);
            await page.mouse.down({ button: 'left' });
            await page.mouse.up({ button: 'left' });
            await delay(2500);

            await expect(page).toFill('input[class="waypoint_name_undefined"]', "Nombre waypoint 1 cucumber-puppeteer");
            await expect(page).toFill('input[class="waypoint_description_Nombre waypoint 1 cucumber-puppeteer"]', "Descripción 1 waypoint cucumber-puppeteer");

            //Guardar ruta
            await page.click('button[id="buttonToSave"]');

            //wait for page to reload
            await delay(5000);
        });

        then('Pedro can view the route on the feed', async () => {
            await page.waitForFunction('document.querySelector("body").innerText.includes("Ruta Cucumber-Puppeteer")');
        });

    });

});

//View route
defineFeature(feature2, test2 => {

    test2('Pedro wants to view a route details', ({ given, when, then }) => {

        given('Pedro has a logged in successfully into the application', () => {
            //Already done in beforeAll() statement
        });

        when('Pedro opens the route details', async () => {
            //Go to my-routes
            await page.goto("http://localhost:" + port + "/#/my-routes");

            await delay(10000);

            //Click on the new route
            await page.waitForSelector('span[class="title_Ruta Cucumber-Puppeteer title"]');
            await page.click('span[class="title_Ruta Cucumber-Puppeteer title"]');
            
            //Click on details
            await page.waitForSelector('button[name="route-details"]');
            await page.click('button[name="route-details"]');
        });

        then('Pedro can view the route details', async () => {
            //Comprobar nombre y descripcion
            await page.waitForSelector('h1[name="Ruta Cucumber-Puppeteer"]');
            await expect(page).toMatchElement('h1[name="Ruta Cucumber-Puppeteer"]');
            await page.waitForSelector('p[name="Descripción de la ruta Cucumber-Puppeteer"]');
            await expect(page).toMatchElement('p[name="Descripción de la ruta Cucumber-Puppeteer"]');

            //Comprobar nombre waypoint
            await page.waitForSelector('div[name="Nombre waypoint 1 cucumber-puppeteer"]');
            await expect(page).toMatchElement('div[name="Nombre waypoint 1 cucumber-puppeteer"]');

            //Clickar en waypoint
            await page.click('div[name="Nombre waypoint 1 cucumber-puppeteer"]');

            //Comprobar descripcion waypoint
            await page.waitForSelector('p[name="Descripción 1 waypoint cucumber-puppeteer"]');
            await expect(page).toMatchElement('p[name="Descripción 1 waypoint cucumber-puppeteer"]');

        });
    });
});

//Update route
defineFeature(feature3, test3 => {

    test3('Pedro wants to mofify a route', ({ given, when, then }) => {

        given('Pedro has a logged in successfully into the application', () => {
            //Already done in beforeAll() statement
        });

        when('Pedro modifies the route', async () => {
            //Go to my-routes
            await page.goto("http://localhost:" + port + "/#/my-routes");

            //Click on the new route
            await page.waitForSelector('span[name="Ruta Cucumber-Puppeteer"]');
            await page.click('span[name="Ruta Cucumber-Puppeteer"]');

            //Click on details
            await page.waitForSelector('button[name="route-details"]');
            await page.click('button[name="route-details"]');

            //Click on edit-route-button
            await page.waitForSelector('button[name="edit-route-button"]');
            await page.click('button[name="edit-route-button"]');

            //Modify the route

            //Wait for page to load
            await page.waitForSelector('input[class="value-name"]');

            //Modify waypoint
            await expect(page).toFill('input[class="waypoint_name_undefined"]', "Nombre modificado waypoint 1 cucumber-puppeteer");
            await expect(page).toFill('input[class="waypoint_description_Nombre waypoint 1 cucumber-puppeteer"]', "Descripción modificada 1 waypoint cucumber-puppeteer");

            //Modify name and description
            await expect(page).toFill('input[class="value-name"]', "Ruta modificada Cucumber-Puppeteer");
            await expect(page).toFill('textarea[class="value-description"]', "Descripción modificada de la ruta Cucumber-Puppeteer");

            //Click on save
            await page.click('button[id="buttonToSave"]');

            //Wait for page to reload
            await delay(9000);

        });

        then('Pedro can view the route with the new fields', async () => {
            //Go to my-routes
            await page.goto("http://localhost:" + port + "/#/my-routes");

            //Click on the new route
            await page.waitForSelector('span[name="Ruta modificada Cucumber-Puppeteer"]');
            await page.click('span[name="Ruta modificada Cucumber-Puppeteer"]');

            //Click on details
            await page.waitForSelector('button[name="route-details"]');
            await page.click('button[name="route-details"]');

            //Comprobar nombre y descripcion
            await page.waitForSelector('h1[name="Ruta modificada Cucumber-Puppeteer"]');
            await expect(page).toMatchElement('h1[name="Ruta modificada Cucumber-Puppeteer"]');
            await page.waitForSelector('p[name="Descripción modificada de la ruta Cucumber-Puppeteer"]');
            await expect(page).toMatchElement('p[name="Descripción modificada de la ruta Cucumber-Puppeteer"]');

            //Comprobar nombre waypoint
            await page.waitForSelector('div[name="Nombre modificado waypoint 1 cucumber-puppeteer"]');
            await expect(page).toMatchElement('div[name="Nombre modificado waypoint 1 cucumber-puppeteer"]');

            //Clickar en waypoint
            await page.click('div[name="Nombre modificado waypoint 1 cucumber-puppeteer"]');

            //Comprobar descripcion waypoint
            //await page.waitForSelector('p[name="Descripción modificada 1 waypoint cucumber-puppeteer"]');
            //await expect(page).toMatchElement('p[name="Descripción modificada 1 waypoint cucumber-puppeteer"]');
        });
    });
});

//Delete route
defineFeature(feature4, test4 => {

    test4('Pedro wants to delete a route', ({ given, when, then }) => {

        given('Pedro has a logged in successfully into the application', () => {
            //Already done in beforeAll() statement
        });

        when('Pedro deletes a route', async () => { //Las funciones en las que se use await deben ser asíncronas

            //Go to my-routes
            await page.goto("http://localhost:" + port + "/#/my-routes");

            //Click on the new route
            await page.waitForSelector('span[class="title_Ruta modificada Cucumber-Puppeteer title"]');
            await page.click('span[class="title_Ruta modificada Cucumber-Puppeteer title"]');

            //Click on details
            await page.waitForSelector('button[name="route-details"]');
            await page.click('button[name="route-details"]');

            //Remove the route
            await page.waitForSelector('button[name="delete-route-button"]');
            await page.click('button[name="delete-route-button"]');

            //Click on confirm
            await page.waitForSelector('button[data-testid="acceptButton"]');
            await page.click('button[data-testid="acceptButton"]');

            //wait for page to reload
            await delay(9000);

        });

        then('Pedro cant view the route on the feed anymore', async () => {
            //Wait for page to load (when the map shows, gm-style is the map)
            await page.waitForSelector('div[class="gm-style"]');

            //Expect the route to disappear
            var existeRutaBorrada = null;
            try {
                existeRutaBorrada = await expect(page).toMatchElement('span[name="Ruta Cucumber-Puppeteer"]');
            } catch (error) {
                //There will be an error if everything is alright
            }

            if (existeRutaBorrada !== null) {
                throw new Error("The route was not removed");
            }
        });

    });

});