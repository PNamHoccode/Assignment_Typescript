const URL_API = `http://localhost:3000`;

type TLoai = {
  id: number;          
  number: number;     
  ten_loai: string;   
  thu_tu: number;
  an_hien: number;
};

interface Binh_Luan {
  id: number;
  id_sp: number;
  noi_dung: string;
  ngay: string;
  ho_ten: string;
  ten_loai: string;
  img_url: string;
}

type TSanPham = {
  id: number;
  ten_sp: string;
  gia: number;
  gia_km: number;
  hinh: string;
};

export const lay_loai = async () => {
  let loai_arr: TLoai[] = await fetch(URL_API + "/loai")
    .then((res) => res.json())
    .catch((error) => {
      console.error('Error fetching data:', error);
      return [];
    });

  let kq = ``;
  loai_arr.forEach((loai) => {
    kq += `<li> <a href="sptrongloai.html?id=${loai.id}">${loai.ten_loai}</a> </li>`;
  });

  console.log(loai_arr);
  return kq;
};

export const lay_ten_loai = async (id: number) => {
  let loai: TLoai;
  try {
    loai = await fetch(URL_API + `/loai/${id}`)
      .then((res) => res.json());
  } catch (err) {
    return `Không có .  (Không có loại ${id})`;
  }
  return `${loai.ten_loai}`;
};

export const code_mot_sp = (sp: TSanPham) => {
  return `
  <div class="sp">
      <a href="chi_tiet.html?id=${sp.id}">
          <img src="${sp.hinh}">
          <h3>${sp.ten_sp}</h3>
      </a>
      <div class="goc">
          <p>Giá gốc: ${Number(sp.gia).toLocaleString("vi")} VNĐ</p>
      </div>
      <div class="discount">
          <p class="disscount">Khuyến mãi: ${Number(sp.gia_km).toLocaleString("vi")} VNĐ</p>
      </div>
  </div>
  `;
};

export const lay_sp_trong_loai = async (id: number) => {
  let sp_arr: TSanPham[] = await fetch(URL_API + `/san_pham?id_loai=${id}`)
    .then((res) => res.json());

  let kq = ``;
  sp_arr.forEach((sp) => {
    kq += code_mot_sp(sp);
  });

  return kq;
};

export const lay_sp = async (so_sp: number) => {
  let sp_arr: TSanPham[] = await fetch(`${URL_API}/san_pham?_sort=-ngay&_limit=${so_sp}`)
    .then((res) => res.json());

  let kq = ``;
  sp_arr.forEach((sp) => {
    kq += code_mot_sp(sp);
  });

  return kq;
};

export const sp_noi_bat = async (so_sp: number) => {
  let sp_arr: TSanPham[] = await fetch(URL_API + `/san_pham?hot=1&_limit=${so_sp}`)
    .then((res) => res.json());

  let kq = ``;
  sp_arr.forEach((sp) => {
    kq += code_mot_sp(sp);
  });

  return kq;
};

export const sp_ban_chay = async (so_sp: number) => {
  let sp_arr: TSanPham[] = await fetch(URL_API + `/san_pham?ban_chay=1&_limit=${so_sp}`)
    .then((res) => res.json());

  let kq = ``;
  sp_arr.forEach((sp) => {
    kq += code_mot_sp(sp);
  });

  return kq;
};

export const lay_binh_luan = async (so_bl: number = 6) => {
  let url_binh_luan = URL_API + `/binh_luan?_sort=-ngay&_limit=${so_bl}`;
  let url_san_pham = URL_API + `/san_pham`;

  let bl_arr: Binh_Luan[] = await fetch(url_binh_luan)
    .then((res) => res.json());

  let sp_arr: TSanPham[] = await fetch(url_san_pham)
    .then((res) => res.json());

  let str = ``;

  bl_arr.forEach((bl) => {
    let san_pham = sp_arr.find((sp) => sp.id === bl.id_sp);
    let ten_san_pham = san_pham ? san_pham.ten_sp : "không có";

    str += `<div class="bl">
    <img src="${bl.img_url}" alt="Hình ảnh bình luận" class="img-binh-luan"/>
    <h5>${bl.ho_ten}  
        <span class="ngay-dang"><strong>Ngày đăng:</strong> ${new Date(bl.ngay).toLocaleDateString("vi")} ${new Date(bl.ngay).toLocaleTimeString("vi")}</span>
    </h5>
    <p class="noi-dung"><strong>Nội dung:</strong> ${bl.noi_dung}</p>
    <p class="san-pham"><strong>Sản phẩm:</strong> ${ten_san_pham}</p>
</div>`;
  });

  return str;
};

export const lay_chi_tiet_sp = async (id: number) => {
  let sp;

  try {
    sp = await fetch(URL_API + `/san_pham/${id}`)
      .then((res) => res.json());
  } catch (err) {
    return `<p>Không tìm thấy sản phẩm với id ${id}.</p>`;
  }

  let chi_tiet_sp = `
      <div class="chi-tiet-sp">
          <img src="${sp.hinh}" alt="Hình sản phẩm">
          <div class="details">
              <h2>${sp.ten_sp}</h2>
              <p class="original-price">Giá gốc: ${Number(sp.gia).toLocaleString("vi")} VNĐ</p>
              <p class="price">Giá khuyến mãi: ${Number(sp.gia_km).toLocaleString("vi")} VNĐ</p>
              <div class="button-container">
                  <button class="btn" onclick="themVaoGioHang(${sp.id})">Thêm vào giỏ hàng</button>
                  <button class="btn" onclick="muaNgay(${sp.id})">Mua ngay</button>
              </div>
              <div class="mo-ta">
                  <p><strong>Mô tả sản phẩm:</strong> ${sp.mo_ta}</p>
              </div>
          </div>
      </div>
  `;

  return chi_tiet_sp;
};

// Sản phẩm cùng loại
export const lay_san_pham_cung_loai = async (id: number) => {
  let sanPhamCungLoai;

  try {
    sanPhamCungLoai = await fetch(`${URL_API}/san_pham?loai=loai_cua_sp&_limit=6`)
      .then((res) => res.json());
  } catch (err) {
    return `<p>Không tìm thấy sản phẩm cùng loại.</p>`;
  }

  let kq = `
      <div class="san-pham-cung-loai">
      <h3>Sản phẩm liên quan</h3>
      <div class="img-container">
          <img src="/img/tieude_giua.png" alt="Tiêu đề sản phẩm" class="img-tieude">
      </div>
      <div class="san-pham-list">
  `;

  sanPhamCungLoai.forEach((sp) => {
    kq += `
          <div class="sp">
              <img src="${sp.hinh}" alt="${sp.ten_sp}">
              <p>${sp.ten_sp}</p>
              <p>${Number(sp.gia_km).toLocaleString("vi")} VNĐ</p>
          </div>
      `;
  });

  kq += `</div></div>`;
  return kq;
};
