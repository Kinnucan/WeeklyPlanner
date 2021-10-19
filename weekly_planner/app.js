// add your JS code here!
const inputs = ['Name', 'Location', 'Day', 'Start Time', 'End Time']
var addEventForm = document.querySelector('#add_event_form')

// JQuery to load when document ready
$(document).ready(function() {
    addFormContent(addEventForm)
    $('#new_event_button').click(function() {
        addEventForm.style.display = 'inline'
    });
});

// EventItem object to hold data for an event
function EventItem(name, location, day, startTime, endTime, duration) {
    this.name = name
    this.location = location
    this.day = day
    this.startTime = startTime
    this.endTime = endTime
    this.duration = duration
}

// Function to generate an HTML div element using data in EventItem
EventItem.prototype.createEvent = function() {
    let event = document.createElement('div')
    event.className = 'event-item'
    event.innerHTML = this.name + '<br/>' + this.location + '<br/>' + this.startTime + ' - ' + this.endTime
    return event
}

// Function to add EventItem div element to DOM
EventItem.prototype.addToPlanner = function() {
    let event = this.createEvent()
    let dayDiv = $('.day-col div:contains(' + this.day + ')').next()
    let divHeight = parseInt(dayDiv.css('height'), 10)
    event.style.top = String((divHeight/24) * (this.duration[0])) + 'px'
    event.style.height = String((divHeight/24) * (this.duration[1] - this.duration[0])) + 'px'
    dayDiv.append(event)
}

// Function to generate content in the add_event_form div
function addFormContent(addEventForm) {
    // Generate user text input
    for (let i = 0; i < 3; i++) {
        let input = document.createElement('input')
        let title = document.createElement('label')
        title.innerHTML = '<br>' + inputs[i] + ':' + '</br>'
        input.id = inputs[i]
        input.style.marginBottom = '5%'
        addEventForm.append(title)
        addEventForm.append(input)
    }

    // Generate user select input
    for (let i = 3; i < 5; i++) {
        var select = document.createElement('select')
        let title = document.createElement('label')
        title.innerHTML = '<br>' + inputs[i] + ':' + '</br>'
        select.name = inputs[i]
        select.style.marginBottom = '5%'
        var hour = 12
        var minutes = 0.00
        var ampm = 'AM'
        var morning = 0
        for (let time = 0.00; time < 24.00; time += 0.25) {
            let option = document.createElement('option')
            option.value = time
            if (hour == 13) hour = 1
            if (hour == 12) morning++ 
            if (morning == 5) ampm = 'PM'
            let quarterHour = (minutes == 0) ? '00' : String((minutes * 60))
            let timeStamp = String(hour) + ':' + quarterHour + ' ' + ampm
            option.textContent = timeStamp
            minutes += 0.25
            if (minutes == 1) {
                hour++
                minutes = 0
            }
            select.append(option)
        }
        addEventForm.append(title)
        addEventForm.append(select)
    }

    // Add submit button and call methods to create EventItem
    let submitButton = document.createElement('button')
    submitButton.innerText = 'Submit Event'
    submitButton.style.float = 'right'
    submitButton.addEventListener('click', function() {
        let name = '<b>' + document.querySelector('#Name').value + '</b>'
        let location = document.querySelector('#Location').value
        let day = document.querySelector('#Day').value
        let startTime = document.querySelector('select[name="Start Time"]')
        let endTime = document.querySelector('select[name="End Time"')
        let sTime = parseFloat(startTime.value, 10)
        let eTime = parseFloat(endTime.value, 10)

        if (sTime < eTime) {
            let newEventItem = new EventItem(name, location, day, startTime.options[startTime.selectedIndex].text, 
                endTime.options[endTime.selectedIndex].text, [sTime, eTime])
            newEventItem.addToPlanner()
            addEventForm.style.display = 'none'
        }
        else alert('End time must be later than start time!')
    });
    addEventForm.append(submitButton)
}
