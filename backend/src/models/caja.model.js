import mongoose from "mongoose"

import MongoosePaginate from 'mongoose-paginate'

const CajaSchema = mongoose.Schema({
    baseCaja: {
        type: String,
        required: true,
    },
    user: {
        type: String,
        required: true
      },
    fechaApertura: {
        type: Date,
        default: Date.now
      },
    fechaCierre: {
        type: Date
      },
    totalVentas: {
        type: Number,
        default: 0
      },
    facturas: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Factura',
          numero: {
            type: String,
            required: true
          },
        }
      ]
    },{    timestamps:true
})

CajaSchema.plugin(MongoosePaginate)

export default mongoose.model("Caja", CajaSchema)