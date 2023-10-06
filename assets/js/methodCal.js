const calculationTimeDiff = (timeNotify) => {
    let timeDiffString = ''

    if(timeNotify) {
        // Lấy thời gian hiện tại
        const now = new Date();
    
        // Tính khoảng cách thời gian từ thời điểm n.time đến hiện tại
        const timeDiff = now.getTime() - timeNotify.getTime();
    
        // Tính toán số lượng đơn vị thời gian khác nhau
        const seconds = Math.floor(timeDiff / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        const months = Math.floor(days / 30);
        const years = Math.floor(months / 12);
    
    
        // Hiển thị kết quả theo đơn vị thời gian khác nhau
        if (seconds < 60) {
          timeDiffString = `${seconds} seconds ago`
        } else if (minutes < 60) {
          timeDiffString = `${minutes} minutes ago`
        } else if (hours < 24) {
          timeDiffString = `${hours} hours ago`
        } else if (days < 30) {
          timeDiffString = `${days} days ago`
        } else if (months < 12) {
          timeDiffString = `${months} months ago`
        } else {
          timeDiffString = `${years} years ago`
        }
    }
    return timeDiffString
  }

module.exports = {
  calculationTimeDiff
}