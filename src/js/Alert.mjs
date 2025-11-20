export default class Alert {
    constructor(alertsPath = '/json/alerts.json') {
        this.alertsPath = alertsPath;
    }

    async fetchAlerts() {
        try {
            const response = await fetch(this.alertsPath);
            if (!response.ok) {
                throw new Error(`Failed to fetch alerts: ${response.status}`)
            }
            const alerts = await response.json();
            console.log(alerts + "alert")

            return alerts;
        } catch (error) {
            console.error('Error fetching alerts:', error);
            return [];
        }
    }

    createAlertElement(alert) {
        const p = document.createElement('p');
        p.textContent = alert.message;
        p.style.backgroundColor = alert.background;
        p.style.color = alert.color;
        p.style.padding = '15px';
        p.style.margin = '10px 0';
        p.style.borderRadius = '4px';
        p.style.textAlign = 'center';
        p.style.fontWeight = '500';
        return p;
    }

    async displayAlerts() {

        const alerts = await this.fetchAlerts();

        // If no alerts, don't create the section
        if (!alerts || alerts.length === 0) {
            return;
        }

        // Create the alert list section
        const section = document.createElement('section');
        section.className = 'alert-list';

        // Loop through alerts and create elements
        alerts.forEach(alert => {
            const alertElement = this.createAlertElement(alert);
            section.appendChild(alertElement);
        })

        // Prepend to main element
        const mainELement = document.querySelector('main');
        if (mainELement) {
            mainELement.prepend(section)
        } else {
            console.error('Main element not found');
        }
    }

}