import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';

export function formatDate(deliveryOption) {
    const today = dayjs();
    const deliveryDate = today.add(
        deliveryOption.deliveryDays,
        'days'
    );

    return deliveryDate.format(
        'dddd, MMMM D'
    );
}