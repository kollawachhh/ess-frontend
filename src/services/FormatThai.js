export default {
    formatMonthTH(month){
        if(month === '01'){
            return 'มกราคม'
        }
        else if(month === '02'){
            return 'กุมภาพันธ์'
        }
        else if(month === '03'){
            return 'มีนาคม'
        }
        else if(month === '04'){
            return 'เมษายน'
        }
        else if(month === '05'){
            return 'พฤษภาคม'
        }
        else if(month === '06'){
            return 'มิถุนายน'
        }
        else if(month === '07'){
            return 'กรกฎาคม'
        }
        else if(month === '08'){
            return 'สิงหาคม'
        }
        else if(month === '09'){
            return 'กันยายน'
        }
        else if(month === '10'){
            return 'ตุลาคม'
        }
        else if(month === '11'){
            return 'พฤศจิกายน'
        }
        else if(month === '12'){
            return 'ธันวาคม'
        }
    },
    formatYearTH(year){
        return parseInt(year)+543
    },
    formatRoleTH(role){
        if(role === 'Admin'){
            return 'แอดมิน'
        }
        else if(role === 'Employee'){
            return 'พนักงาน'
        }
        else{
            return 'หัวหน้างาน'
        }
    },
}