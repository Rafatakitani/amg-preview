import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static values = {
    number: String
  }

  static targets = [
    "status",
    "photoNote"
  ]

  submit(event) {
    event.preventDefault()

    const form = event.target

    // Validar form nativo
    if (!form.checkValidity()) {
      form.reportValidity()
      return
    }

    const name = form.elements.name?.value?.trim()
    const phone = form.elements.phone?.value?.trim()
    const service = form.elements.service?.value?.trim()
    const location = form.elements.location?.value?.trim()
    const description = form.elements.description?.value?.trim() || "Não informada"
    const photoInput = form.elements.photo
    const hasPhoto = photoInput?.files?.length > 0

    // Montar mensagem exatamente conforme spec
    let message = `Olá, AMG Serralheria! Gostaria de solicitar um orçamento.\n\nNome: ${name}\nTelefone: ${phone}\nServiço: ${service}\nLocal: ${location}\nDescrição: ${description}`

    if (hasPhoto) {
      message += "\n\nVou enviar uma foto do local em seguida."
    }

    const url = `https://wa.me/${this.numberValue}?text=${encodeURIComponent(message)}`

    // Mostrar status acessível
    this.statusTarget.textContent = "Abrindo o WhatsApp…"
    this.statusTarget.classList.remove("hidden")

    // Tentar abrir com window.open
    const whatsappWindow = window.open(url, "_blank", "noopener")

    // Se bloqueado, usar location.href
    if (!whatsappWindow) {
      window.location.href = url
    }
  }

  onPhotoChange(event) {
    const input = event.target
    const fileName = input.files?.[0]?.name

    if (fileName) {
      this.photoNoteTarget.textContent = `Arquivo: ${fileName}`
      this.photoNoteTarget.classList.remove("hidden")
    } else {
      this.photoNoteTarget.classList.add("hidden")
      this.photoNoteTarget.textContent = ""
    }
  }
};
