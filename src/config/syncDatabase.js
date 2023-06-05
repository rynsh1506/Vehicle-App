const sequelize = require("./dbconection");

const syncDatabase = async () => {
    try {
        await sequelize.sync({ force: true });

        console.log("Sinkronisasi tabel berhasil.");
    } catch (error) {
        console.error("Terjadi kesalahan saat sinkronisasi tabel:", error);
    }
};

syncDatabase();
