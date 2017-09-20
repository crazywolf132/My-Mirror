var config = {
    lang: 'en-au',
    time: {
        timeFormat: 12,
        displaySeconds: true,
        digitFade: false,
    },
    display: {
        time: true,
        compliments: true,
        weather: true,
        news: true,
        date: true
    },
    weather: {
        //change weather params here:
        //units: metric or imperial
        interval: 120000,
        fadeInterval: 10000,
    },
    compliments: {
        interval: 30000,
        fadeInterval: 4000,
        morning: [
            'Good morning, handsome!',
            'Enjoy your day!',
            'How was your sleep?'
        ],
        afternoon: [
            'Hello, beauty!',
            'You look sexy!',
            'Looking good today!'
        ],
        evening: [
            'Wow, you look hot!',
            'You look nice!',
            'Hi, sexy!'
        ]
    },
    calendar: {
        maximumEntries: 5, // Total Maximum Entries
		displaySymbol: true,
		defaultSymbol: 'calendar', // Fontawsome Symbol see http://fontawesome.io/cheatsheet/
        urls: [
		{
			symbol: 'calendar-plus-o',
			url: 'webcal://files.apple.com/calendars/Australian32Holidays.ics'
		},
		]
    },
    news: {
        feed: 'http://feeds.reuters.com/Reuters/worldNews'
    }
}
