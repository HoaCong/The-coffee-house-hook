import React, {Component} from 'react'
import logo_footer from '../../img/logo_footer.png'
import appstore from '../../img/appstore.png'
import google_play from '../../img/google-play-badge.png'
import gov from '../../img/gov.png'
class Footer extends Component {
    render() {
      return (
        <footer>
        <div className="box_footer">
            <div className="ele_footer">
                <img src={logo_footer} alt="" height="108"/>
                <div className="social">
                    <i className="fab fa-facebook"></i>
                    <i className="fab fa-instagram"></i>
                </div>
            </div>
            <div className="ele_footer">
                <div className="about">
                    <h3>VỀ CHÚNG TÔI</h3>
                    <p className="name_company">CÔNG TY CỔ PHẦN THƯƠNG MẠI DỊCH VỤ TRÀ CÀ PHÊ VN</p>
                </div>
                <li> <a href="/#">Điều khoản và điệu kiện</a></li>
                <li><a href="/#">Chính sách bảo mật</a></li>
                <img src={gov} alt="" width="200"/>
            </div>
            <div className="ele_footer">
                <h3>ỨNG DỤNG THE COFFEE HOUSE</h3>
                <img className="b-full" src={appstore} alt="" height="40px"/><br/>
                <img className="b-full" src={google_play} alt="" height="40px"/>
            </div>
            <div className="ele_footer">
                <h3>HỖ TRỢ KHÁCH HÀNG</h3>
                <p>Delivery: 1800 6936</p>
                <p>Hotline: 02871 087 088</p>
                <p>Địa chỉ: Lầu 7, 62 Trần Quang Khải, phường Tân</p>
                <p>Định, quận 1, HCMC</p>
            </div>
        </div>
        <div className="more_info">
            <p>© 2018 CÔNG TY CỔ PHẦN THƯƠNG MẠI DỊCH VỤ TRÀ CÀ PHÊ VN</p>

            <p>86-88 Cao Thắng, phường 4, quận 3, Hồ Chí Minh</p>

            <p> Số giấy phép ĐKKD: 0312867172 do sở kế hoạch đầu tư TPHCM ngày 23/07/2014</p>
        </div>
    </footer>
    );
  }
}
export default Footer;