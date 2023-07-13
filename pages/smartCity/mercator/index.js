const lon2xy = (longitude, latitude) => {
  const E = longitude;
  const N = latitude;
  const x = E * 20037508.34 / 180;
  let y = Math.log(Math.tan((90 + N) * Math.PI / 360)) / (Math.PI / 180);
  y = y * 20037508.34 / 180;
  return {
    x, // 墨卡托x坐标——对应经度
    y, // 墨卡托y坐标——对应维度
  }
}

console.log(lon2xy(119.589381, 32.384796))

const mktlng = (x, y) => {
  const longitude = x / 20037508.34 * 180
  const tem = y / 20037508.34 * 180
  const latitude = 180 / Math.PI * (2 * Math.atan(Math.exp(tem * Math.PI / 180)) - Math.PI / 2)
  return {
    longitude,
    latitude
  }
}

console.log(mktlng(13312628.995349653, 3813927.746266314))

/*
经纬度转墨卡托
@params
lonlat     转换前经纬度坐标的对象
*/
function lonlat2mercator(lonlat) {
	var mercator = {
		x: 0,
		y: 0
	};
	var x = lonlat.x * 20037508.34 / 180;
	var y = Math.log(Math.tan((90 + lonlat.y) * Math.PI / 360)) / (Math.PI / 180);
	y = y * 20037508.34 / 180;
	mercator.x = x;
	mercator.y = y;
	return mercator;
}

console.log(lonlat2mercator({x: 119.589381, y: 32.384796}))
/*
墨卡托转经纬度
@params
lonlat     转换前墨卡托坐标的对象
*/
function mercator2lonlat(mercator) {
	var lonlat = {
		x: 0,
		y: 0
	};
	var x = mercator.x / 20037508.34 * 180;
	var y = mercator.y / 20037508.34 * 180;
	y = 180 / Math.PI * (2 * Math.atan(Math.exp(y * Math.PI / 180)) - Math.PI / 2);
	lonlat.x = x;
	lonlat.y = y;
	return lonlat;
}

console.log(mercator2lonlat({x: 13312628.995349653, y: 3813927.746266314}))
