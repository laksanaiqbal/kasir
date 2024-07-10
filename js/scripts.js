$(document).ready(function () {
  function SubTotal_update(row) {
    const qty = parseFloat(row.find(".qty").val()) || 0;
    const harga_bijian = parseFloat(row.find(".harga_bijian").val()) || 0;
    const subTotal = qty * harga_bijian;
    row.find(".sub_total").val(subTotal);
    Total_update();
  }

  function Total_update() {
    let total = 0;
    $(".sub_total").each(function () {
      total += parseFloat($(this).val()) || 0;
    });
    $("#total").val(total);
    Kembalian_update();
  }

  function Kembalian_update() {
    const total = parseFloat($("#total").val()) || 0;
    const Bayar_Tunai = parseFloat($("#bayar_tunai").val()) || 0;
    const kembalian = Bayar_Tunai - total;
    $("#kembalian").val(kembalian);
  }

  $("#itemsBody").on("input", ".qty, .harga_bijian", function () {
    const row = $(this).closest("tr");
    SubTotal_update(row);
  });

  $("#bayar_tunai").on("input", function () {
    Kembalian_update();
  });

  $("#tambah_barang").click(function () {
    const newRow = `
        <tr>
          <td><input type="text" class="form-control item" required /></td>
          <td><input type="number" class="form-control qty" required /></td>
          <td><input type="number" class="form-control harga_bijian" required /></td>
          <td><input type="number" class="form-control sub_total" readonly /></td>
          <td><button type="button" class="btn btn-danger delete"><i class="bi bi-trash"></i></button></td>
        </tr>
      `;
    $("#itemsBody").append(newRow);
  });

  $("#itemsBody").on("click", ".delete", function () {
    $(this).closest("tr").remove();
    Total_update();
  });

  $("#kasir").submit(function (event) {
    event.preventDefault();
    const data = {
      Nama_Pelanggan: $("#nama_pelanggan").val(),
      Tanggal: $("#tanggal").val(),
      Jam: $("#jam").val(),
      Total: parseFloat($("#total").val()),
      Bayar_Tunai: parseFloat($("#bayar_tunai").val()),
      Kembali: parseFloat($("#kembalian").val()),
      Detil_Penjualan: [],
    };

    $("#itemsBody tr").each(function () {
      const row = $(this);
      const item = {
        Item: row.find(".item").val(),
        Qty: parseFloat(row.find(".qty").val()),
        HargaSatuan: parseFloat(row.find(".harga_bijian").val()),
        SubTotal: parseFloat(row.find(".sub_total").val()),
      };
      data.Detil_Penjualan.push(item);
    });

    alert(JSON.stringify(data, null, 2));
  });
});
