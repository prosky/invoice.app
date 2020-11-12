

class Application {

    static storageKey = 'Application';

    locale: string = Application.findLocale();


    static findLocale(): string {
        return navigator.language.replace('-', '_');
    };

    static load() {
        const data = localStorage.getItem(Application.storageKey);
        let app: Application;
        if (data) {
            app = JSON.parse(data);
        } else {
            app = new Application();
        }
        return app;
    }

    store() {
        localStorage.setItem('Application', Application.storageKey);
    }

};

export default new Application();
