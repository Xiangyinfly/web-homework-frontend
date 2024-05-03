export const getTime = () => {
    let message = ''
    let hour = new Date().getHours()
    if (hour >= 4 && hour < 10) {
        message = 'Hello,早上好～'
    } else if (hour >= 10 && hour < 14) {
        message = 'Hello,中午好～'
    } else if (hour >= 14 && hour < 19) {
        message = 'Hello,下午好～'
    } else {
        message = 'Hello,晚上好～'
    }

    return message
}