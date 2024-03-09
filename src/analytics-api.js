export const trackPageView = (userData) => {
    console.log(`Page view tracked for variation: ${userData.variation}`);
};

export const trackEvent = (eventName, userData) => {
    console.log(`Event "${eventName}"`);
    console.log(userData)
};
