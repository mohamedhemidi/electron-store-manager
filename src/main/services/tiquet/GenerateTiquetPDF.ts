import { dialog } from 'electron'
import { jsPDF } from 'jspdf'
import moment from 'moment'

const GenerateTiquetPDF = async (event, args): Promise<void> => {
  console.log('======== PRINT PDF ========', event, args)

  const doc = new jsPDF({
    unit: 'mm',
    format: [90, 90] // Custom width for receipt-like layout
  })

  const startX = 5 // Left padding
  let startY = 10 // Start from the top with some padding
  const lineHeight = 8 // Line height for each row

  doc.setFontSize(10)
  doc.text(`Id : ${args.id}`, startX, startY)
  startY += lineHeight
  doc.text(`Name : ${args.name}`, startX, startY)
  startY += lineHeight
  doc.text(`Price : ${args.price} DZA`, startX, startY)
  startY += lineHeight
  doc.text(`Due Date : ${moment(args.dueDate).format('DD/MM/YYYY h:mmA')}`, startX, startY)
  startY += lineHeight
  doc.text(`createdAt : ${moment(args.createdAt).format('DD/MM/YYYY h:mmA')}`, startX, startY)
  startY += lineHeight
  doc.line(startX, startY, 75, startY)
  startY += lineHeight
  doc.text(`Generated At : ${moment().format('DD/MM/YYYY h:mmA')}`, startX, startY)

  const { filePath } = await dialog.showSaveDialog({
    title: 'Save PDF',
    defaultPath: `tiquet_${args.id}_${moment().format('YYYYMMDD_HHmmss')}.pdf`,
    // defaultPath: `generated-from-json.pdf`,
    filters: [{ name: 'PDFs', extensions: ['pdf'] }]
  })

  if (filePath) {
    doc.save(filePath)
  }
}
export default GenerateTiquetPDF
