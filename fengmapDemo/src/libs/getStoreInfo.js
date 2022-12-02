export default function showTable(mode, floor) {
    console.log(mode);

    //发送信息给服务端
    //获取仓库信息
    this.$socket.emit("getStoreInfo", {
        storeName: mode.name,
    });

    //接收服务端的信息
    this.sockets.subscribe("sendStoreInfo", (obj) => {
        console.log(obj.msg);
    });

    console.log(floor);
}