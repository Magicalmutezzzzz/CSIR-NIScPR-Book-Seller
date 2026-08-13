# Publications API Debug Checklist

## ✅ Model

Publication model
- [x] publication_type relationship exists
- [x] publisher relationship exists
- [x] category relationship exists

No changes needed.

---

## Repository

### Bug 1

Replace

```python
query.filter({publication.price} >= min_price)
```

with

```python
query.filter(Publication.price >= min_price)
```

Replace

```python
query.filter({publication.price} <= max_price)
```

with

```python
query.filter(Publication.price <= max_price)
```

---

### Bug 2

Load relationships.

Import

```python
from sqlalchemy.orm import joinedload
```

Then

```python
query = self.db.query(Publication).options(
    joinedload(Publication.publication_type),
    joinedload(Publication.publisher),
)
```

---

## Schema

Current response only returns

publication_type_id

Need

```json
{
    "publication_type": {
        "id": "...",
        "name": "Book"
    }
}
```

Create

```python
class PublicationTypeSimple(BaseModel):
    id: UUID
    name: str

    model_config = ConfigDict(from_attributes=True)
```

Then

```python
class PublicationResponse(PublicationBase):
    id: UUID

    publication_type: PublicationTypeSimple

    model_config = ConfigDict(from_attributes=True)
```

---

## Frontend

Publication interface should become

```ts
publication_type?: {
    id: string
    name: string
}
```

instead of only

```ts
publication_type_id
```

---

## BookCard

BookCardProps

Change

```ts
id:number
```

to

```ts
id:string
```

---

## Search

Replace

```ts
publication.publication_type_id
```

with

```ts
publication.publication_type?.name
```

after backend is fixed.

---

## Featured

Replace

```ts
publication.publication_type_id
```

with

```ts
publication.publication_type?.name
```

---

## LatestBooks

Replace

```ts
publication.publication_type_id
```

with

```ts
publication.publication_type?.name
```

---

## Categories

Replace

```ts
publication.publication_type_id
```

with

```ts
publication.publication_type?.name
```

---

## Final API Response

Should become

```json
[
  {
    "id": "...",
    "title": "...",
    "price": "500.00",
    "stock": 10,
    "publication_type": {
      "id": "...",
      "name": "Book"
    },
    "publisher": {
      "id": "...",
      "name": "CSIR"
    }
  }
]
```