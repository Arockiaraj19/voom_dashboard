const navigateToMap=(lat:any ,lng:any)=>{
    const url = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
    window.open(url, '_blank');
}

export default navigateToMap;