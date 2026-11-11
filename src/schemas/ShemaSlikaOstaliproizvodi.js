import { z } from 'zod'

export const ShemaSlikaOstaliproizvodi = z.object({
  naziv: z.string()
    .trim()
    .min(1, "Naziv je obavezan i ne smije sadržavati samo razmake!")
    .min(3, "Naziv mora imati najmanje 3 znaka!")
    .max(30, "Naziv može imati najviše 30 znakova!"),

  godinaIzrade: z.coerce.number({
    invalid_type_error: "Godina izrade mora biti broj!",
  })
    .min(2022, "Godina izrade mora biti godina između 2022 i 2026 godine!")
    .max(2026, "Godina izrade mora biti godina između 2022 i 2026 godine!"),

  tehnika: z.string()
    .min(1, "Odabir tehnike je obavezan!"),

  materijal: z.string()
    .min(1, "Odabir materijala je obavezan!"),

  sirina: z.coerce.number({
    invalid_type_error: "Širina mora biti između 20 i 140 centimetara!",
  })
    .min(20, "Širina mora biti između 20 i 140 centimetara!")
    .max(140, "Širina mora biti između 20 i 140 centimetara!"),

  visina: z.coerce.number({
    invalid_type_error: "Visina mora biti između 20 i 140 centimetara!",
  })
    .min(20, "Visina mora biti između 20 i 140 centimetara!")
    .max(140, "Visina mora biti između 20 i 140 centimetara!"),

  opis: z.string()
    .trim()
    .min(1, "Opis je obavezan i ne smije sadržavati samo razmake!")
    .min(3, "Opis slike mora imati najmanje 3 znaka!")
    .max(500, "Opis slike može imati najviše 500!"),

  oznake: z.array(z.number())
    .min(1, "Morate odabrati barem jednu oznaku!"),

})